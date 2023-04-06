class AddSubscriptionStatus < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :status, :string, null: false
  end
end
