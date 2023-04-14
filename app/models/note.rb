class Note < ApplicationRecord
  belongs_to :notebook
  delegate :user, :to => :notebook

  with_options dependent: :destroy do
    has_many :note_images
  end

  encrypts :content, :title
end
