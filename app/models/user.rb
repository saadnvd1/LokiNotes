class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  with_options dependent: :destroy do
    has_many :notebooks
    has_many :notes, through: :notebooks
    has_one :subscription
    has_one :plan, through: :subscription
    has_many :features, through: :plan
  end
end
