class Addnotesmetadeta < ActiveRecord::Migration[7.0]
  def change
    add_column :notebooks, :meta, :jsonb, default: {}
  end
end
