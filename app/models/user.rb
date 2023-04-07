class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  with_options dependent: :destroy do
    has_many :notebooks
    has_many :notes, through: :notebooks

    has_one :plan, through: :subscription
    has_many :features, through: :plan

    has_one :subscription
    has_one :trial
  end

  # The user actually pays us money
  def paying?
    subscription.present? && subscription.active?
  end

  def on_trial?
    trial.present? && trial.active? && subscription.blank?
  end

  # used to determine if the user has access to premium features or not
  def premium?
    paying? || on_trial?
  end
end
