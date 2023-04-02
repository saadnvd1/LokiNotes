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

    render json: { prices: @prices }
  end
  def create_session_checkout
    price_id = create_session_params[:price_id]

    session = Stripe::Checkout::Session.create({
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price: price_id,
      }],
    })

    render json: { url: session.url }
  end

  private

  def create_session_params
    params.permit(:price_id)
  end
end