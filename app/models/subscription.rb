class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :plan

  validates :stripe_customer_id, :stripe_subscription_id, presence: true
end
