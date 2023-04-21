class Trial < ApplicationRecord
  belongs_to :user

  validates :start_date, :end_date, :user_id, presence: true

  def active?
    Time.now.between?(start_date, end_date) && active
  end
end

# == Schema Information
#
# Table name: trials
#
#  id         :bigint           not null, primary key
#  active     :boolean          default(TRUE)
#  end_date   :datetime         not null
#  start_date :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_trials_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
