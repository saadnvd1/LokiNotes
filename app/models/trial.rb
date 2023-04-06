class Trial < ApplicationRecord
  belongs_to :user

  validates :start_date, :end_date, :user_id, presence: true

  def active?
    Time.now.between?(start_date, end_date) && active
  end
end