class Plan < ApplicationRecord

  with_options dependent: :destroy do
    has_many :features
    has_many :subscriptions
    has_many :prices
  end

  validates :name, :stripe_product_id, presence: true
end
