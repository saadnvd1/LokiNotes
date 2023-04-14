class Notebook < ApplicationRecord
  has_ancestry(orphan_strategy: :destroy)

  belongs_to :user

  with_options dependent: :destroy do
    has_many :notes
  end

  encrypts :name
end
