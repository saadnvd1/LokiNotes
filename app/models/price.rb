class Price < ApplicationRecord
  belongs_to :plan
  validates :stripe_price_id, :name, presence: true
end

# == Schema Information
#
# Table name: prices
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  plan_id         :bigint           not null
#  stripe_price_id :string           not null
#
# Indexes
#
#  index_prices_on_plan_id  (plan_id)
#
# Foreign Keys
#
#  fk_rails_...  (plan_id => plans.id)
#
