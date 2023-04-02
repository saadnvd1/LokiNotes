class Price < ApplicationRecord
  belongs_to :plan
  validates :stripe_price_id, :name, presence: true
end
