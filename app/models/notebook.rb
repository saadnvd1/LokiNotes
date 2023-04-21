class Notebook < ApplicationRecord
  has_ancestry(orphan_strategy: :destroy)

  belongs_to :user

  with_options dependent: :destroy do
    has_many :notes
  end

  encrypts :name
end

# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint           not null, primary key
#  ancestry   :string
#  meta       :jsonb
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_notebooks_on_ancestry  (ancestry)
#  index_notebooks_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
