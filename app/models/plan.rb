class Plan < ApplicationRecord

  with_options dependent: :destroy do
    has_many :features
    has_many :subscriptions
    has_many :prices
  end

  validates :name, :stripe_product_id, presence: true
end

# == Schema Information
#
# Table name: plans
#
#  id                :bigint           not null, primary key
#  name              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  stripe_product_id :string
#
