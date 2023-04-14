class NoteImage < ApplicationRecord
  mount_uploader :file, NoteImageUploader

  belongs_to :note

  validates :file, presence: true
end
