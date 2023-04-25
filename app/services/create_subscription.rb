class CreateSubscription < ActiveInteraction::Base
  string :subscription_id
  object :user

  def execute
    return if user.subscription.present?

    subscription = Stripe::Subscription.retrieve(subscription_id)
    product_id = subscription.items.first.price.product

    subscription_obj = Subscription.create!(
      stripe_customer_id: subscription.customer,
      stripe_subscription_id: subscription_id,
      user: user,
      plan: Plan.find_by(stripe_product_id: product_id),
      status: subscription.status
    )

    # If a trial exists, set its active to false
    # We don't want to delete it because we might be able to use it for analytics
    # Technically, every user should have a trial because we always create one when a user signs up
    user.trial.update!(active: false) if user.trial.present?

    # TODO: Send email to user that they have successfully subscribed to a plan

    subscription_obj
  end
end
