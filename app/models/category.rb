class Category < ApplicationRecord
  has_ancestry
  belongs_to :user
  has_many :notes
end
