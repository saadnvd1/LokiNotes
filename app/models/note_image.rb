class NoteImage < ApplicationRecord
  mount_uploader :file, NoteImageUploader

  belongs_to :note

  validates :file, presence: true
end

# == Schema Information
#
# Table name: note_images
#
#  id         :bigint           not null, primary key
#  file       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  note_id    :bigint           not null
#
# Indexes
#
#  index_note_images_on_note_id  (note_id)
#
# Foreign Keys
#
#  fk_rails_...  (note_id => notes.id)
#
