class ChangeColumnTypes < ActiveRecord::Migration[7.0]
  def change
    change_column :notes, :title, :text
    change_column :notes, :content, :text
    change_column :notebooks, :name, :text
  end
end
