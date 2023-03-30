class Note < ApplicationRecord
  belongs_to :notebook
  delegate :user, :to => :notebook

  encrypts :content, :title
end
