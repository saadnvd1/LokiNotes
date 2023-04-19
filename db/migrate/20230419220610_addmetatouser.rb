class Addmetatouser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :meta, :jsonb, default: {}
  end
end
