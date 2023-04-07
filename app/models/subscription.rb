class Subscription < ApplicationRecord
  STATUSES = {
      active: "active",
      past_due: "past_due",
      unpaid: "unpaid",
      canceled: "canceled",
      incomplete: "incomplete",
      incomplete_expired: "incomplete_expired",
      trialing: "trialing",
      ended: "ended"
    }.freeze

  belongs_to :user
  belongs_to :plan

  validates :stripe_customer_id, :stripe_subscription_id, presence: true
  validates :status, inclusion: { in: STATUSES.values }

  STATUSES.values.each do |status|
    define_method "#{status}?" do
      self.status == status
    end
  end

  def stripe_subscription
    Stripe::Subscription.retrieve(stripe_subscription_id)
  end
end
