class BillingController < ApplicationController
  skip_before_action :authenticate_user!, only: :webhook
  def index
    # Stripe prices won't change that often, so we can cache them in Redis forever
    # I really don't want to store the price in the database, it just seems like a waste of space
    # and it won't change that often anyways. Stripe should be the source of truth for prices.
    if $redis.get("prices").nil?
      cached_prices = {}
      Stripe::Price.list.each do |price|
        cached_prices[price.id] = {"amount" => price.unit_amount}
      end

      $redis.set("prices", cached_prices.to_json)
    else
      cached_prices = Oj.load($redis.get("prices"))
    end

    @prices = Price.all.map do |price|
      {
        name: price.name,
        stripe_price_id: price.stripe_price_id,
        amount: cached_prices[price.stripe_price_id]["amount"]
      }
    end

    render :index
  end

  def create_session_checkout
    price_id = create_session_params[:price_id]

    session = Stripe::Checkout::Session.create({
      success_url: ENV.fetch("STRIPE_CHECKOUT_SUCCESS_URL", "http://localhost:3000/billing/success"),
      cancel_url: ENV.fetch("STRIPE_CHECKOUT_CANCEL_URL", "http://localhost:3000"),
      mode: "subscription",
      line_items: [{
        quantity: 1,
        price: price_id
      }],
      metadata: {
        user_id: current_user.id
      }
    })

    render json: {url: session.url}
  end

  def webhook
    result = HandleStripeWebhooks.run(payload: request.body.read, signature: request.headers["HTTP_STRIPE_SIGNATURE"])

    if result.valid?
      render json: :ok
    else
      render json: {error: result.errors.full_messages}, status: :bad_request
    end
  end

  def check_subscription_status
    if current_user.subscription.nil?
      render json: {status: "not_subscribed"}
    else
      render json: {status: "not_subscribed", subscription: current_user.subscription}
    end
  end

  def get_subscription
    return render json: {subscription: nil} if current_user.subscription.nil?

    @subscription = current_user.subscription
    render "billing/subscription"
  end

  def create_customer_portal_session
    session = Stripe::BillingPortal::Session.create({
      customer: current_user.subscription.stripe_customer_id,
      return_url: ENV.fetch("STRIPE_PORTAL_RETURN_URL", "http://localhost:3000")
    })

    render json: {url: session.url}
  end

  private

  def success_params
    params.permit(:checkout_session_id)
  end

  def create_session_params
    params.permit(:price_id)
  end
end
