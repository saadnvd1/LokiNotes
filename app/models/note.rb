class Note < ApplicationRecord
  belongs_to :notebook

  encrypts :content, :title
end
