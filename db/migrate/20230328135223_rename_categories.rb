class RenameCategories < ActiveRecord::Migration[7.0]
  def change
    rename_table :categories, :notebooks
    rename_column :notes, :category_id, :notebook_id
  end
end
