class Notebook < ApplicationRecord
  has_ancestry
  belongs_to :user
  has_many :notes

  encrypts :name
end
