class CreateTrials < ActiveRecord::Migration[7.0]
  def change
    # I want the user to have access to features immediately when they register, so that we can start point out which features are free, and which are paid. This way, the user knows exactly what they would be missing out if they don't upgrade.
    create_table :trials do |t|
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
