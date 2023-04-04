class CreateSubscription < ActiveInteraction::Base
  string :checkout_session_id
  object :user

  def execute
    return if user.subscription.blank?

    session = Stripe::Checkout::Session.retrieve(checkout_session_id)
    subscription = Stripe::Subscription.retrieve(session.subscription)
    customer = Stripe::Customer.retrieve(subscription.customer)
    price_id = subscription.items.data[0].price.id
    price = Stripe::Price.retrieve(price_id)
    product_id = price.product

    subscription_obj = Subscription.create!(
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      user: user,
      plan: Plan.find_by(stripe_product_id: product_id),
    )

    # If a trial exists, set its active to false
    # We don't want to delete it because we might be able to use it for analytics
    # Technically, every user should have a trial because we always create one when a user signs up
    user.trial.update(active: false) if user.trial.present?

    # TODO: Send email to user that they have successfully subscribed to a plan

    subscription_obj
  end
end