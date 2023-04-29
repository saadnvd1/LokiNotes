class Note < ApplicationRecord
  has_paper_trail(
    versions: {class_name: "NoteVersion"},
    on: %i[update],
    ignore: %i[updated_at]
  )

  belongs_to :notebook
  delegate :user, to: :notebook

  with_options dependent: :destroy do
    has_many :note_images
  end

  encrypts :content
  encrypts :title, deterministic: true, previous: { deterministic: false }
end

# == Schema Information
#
# Table name: notes
#
#  id          :bigint           not null, primary key
#  content     :text
#  title       :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  notebook_id :bigint
#
# Indexes
#
#  index_notes_on_notebook_id  (notebook_id)
#
# Foreign Keys
#
#  fk_rails_...  (notebook_id => notebooks.id)
#
