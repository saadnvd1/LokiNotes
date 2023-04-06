class Subscription < ApplicationRecord
  STATUSES = %w[active canceled incomplete incomplete_expired past_due trialing unpaid]


  belongs_to :user
  belongs_to :plan

  validates :stripe_customer_id, :stripe_subscription_id, presence: true
  validates :status, inclusion: { in: STATUSES }

  enum status: {
    active: "active",
    past_due: "past_due",
    unpaid: "unpaid",
    canceled: "canceled",
    incomplete: "incomplete",
    incomplete_expired: "incomplete_expired",
    trialing: "trialing",
    ended: "ended"
  }

  STATUSES.each do |status|
    define_method "#{status}?" do
      self.status == status
    end
  end
end
