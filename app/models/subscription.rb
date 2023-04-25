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
  validates :status, inclusion: {in: STATUSES.values}

  STATUSES.values.each do |status|
    define_method "#{status}?" do
      self.status == status
    end
  end

  def stripe_subscription
    Stripe::Subscription.retrieve(stripe_subscription_id)
  end
end

# == Schema Information
#
# Table name: subscriptions
#
#  id                     :bigint           not null, primary key
#  status                 :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  plan_id                :bigint           not null
#  stripe_customer_id     :string
#  stripe_subscription_id :string
#  user_id                :bigint           not null
#
# Indexes
#
#  index_subscriptions_on_plan_id  (plan_id)
#  index_subscriptions_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (plan_id => plans.id)
#  fk_rails_...  (user_id => users.id)
#
