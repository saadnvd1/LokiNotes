class CreatePrices < ActiveRecord::Migration[7.0]
  def change
    create_table :prices do |t|
      t.references :plan, null: false, foreign_key: true
      t.string :stripe_price_id, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
