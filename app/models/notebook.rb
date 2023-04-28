class Notebook < ApplicationRecord
  validate :validate_only_one_default_per_user
  has_ancestry(orphan_strategy: :destroy)

  belongs_to :user

  with_options dependent: :destroy do
    has_many :notes
  end

  encrypts :name

  def validate_only_one_default_per_user
    if default.present? && user.notebooks.where(default: true).exists?
      errors.add(:default, "Sorry, a user can only have one default notebook")
    end
  end
end

# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint           not null, primary key
#  ancestry   :string
#  default    :boolean          default(FALSE), not null
#  meta       :jsonb
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_notebooks_on_ancestry                  (ancestry)
#  index_notebooks_on_user_id                   (user_id)
#  index_notebooks_on_user_id_and_default_true  (user_id) UNIQUE WHERE ("default" = true)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
