class Note < ApplicationRecord
  belongs_to :category

  encrypts :content, :title
end
