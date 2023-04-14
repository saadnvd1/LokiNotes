class AddNoteImages < ActiveRecord::Migration[7.0]
  def change
    create_table :note_images do |t|
      t.string :file
      t.references :note, null: false, foreign_key: true

      t.timestamps
    end
  end
end
