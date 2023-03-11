class AddInitialDataModelsWoo < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.references :user, index: true, foreign_key: true
      t.string :name
      t.string :ancestry, index: true

      t.timestamps null: false
    end

    create_table :notes do |t|
      t.references :category, index: true, foreign_key: true
      t.string :content

      t.timestamps null: false
    end
  end
end
