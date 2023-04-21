class NoteVersion < ApplicationRecord
  include PaperTrail::VersionConcern

  self.table_name = :note_versions

  encrypts :object
  encrypts :object_changes
end

# == Schema Information
#
# Table name: note_versions
#
#  id             :bigint           not null, primary key
#  event          :string           not null
#  item_type      :string           not null
#  object         :json
#  object_changes :json
#  whodunnit      :string
#  created_at     :datetime
#  item_id        :bigint           not null
#
# Indexes
#
#  index_note_versions_on_item_type_and_item_id  (item_type,item_id)
#
