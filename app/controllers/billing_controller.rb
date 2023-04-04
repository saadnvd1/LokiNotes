class BillingController < ApplicationController
  def index
    # Stripe prices won't change that often, so we can cache them in Redis forever
    # I really don't want to store the price in the database, it just seems like a waste of space
    # and it won't change that often anyways. Stripe should be the source of truth for prices.
    if $redis.get('prices').nil?
      cached_prices = {}
      Stripe::Price.list.each do |price|
        cached_prices[price.id] = { amount: price.unit_amount }
      end

      $redis.set('prices', cached_prices.to_json)
    else
      cached_prices = Oj.load($redis.get('prices'))
    end

    @prices = Price.all.map do |price|
      {
        name: price.name,
        stripe_price_id: price.stripe_price_id,
        amount: cached_prices[price.stripe_price_id]["amount"]
      }
    end

    render json: { prices: @prices, is_on_trial: current_user.on_trial? }
  end
  def create_session_checkout
    price_id = create_session_params[:price_id]

    Stripe::Checkout::Session

    session = Stripe::Checkout::Session.create({
      success_url: 'http://localhost:3000/billing/success/{CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000',
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price: price_id,
      }],
    })

    render json: { url: session.url }
  end

  def success
    # TODO: just verify this still works when you get a chance
    CreateSubscription.run!(
      checkout_session_id: success_params[:checkout_session_id],
      user: current_user
    )

    # TODO: also we'll have to update the frontend to show the user that they have successfully subscribed to a plan eventually

    render json: :ok
  end

  private

  def success_params
    params.permit(:checkout_session_id)
  end

  def create_session_params
    params.permit(:price_id)
  end
end