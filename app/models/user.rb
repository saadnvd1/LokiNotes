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

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  meta                   :jsonb
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
