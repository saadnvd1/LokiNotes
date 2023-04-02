class CreateSubscriptions < ActiveRecord::Migration[7.0]
  def change
    # By default, I'm thinking that each customer will have a single subscription
    # And that subscription will automatically be part of the `free` plan
    # Once a user upgrades, we'll change their subscription to the new plan
    # Currently, we'll only have "free" and "premium" plans
    create_table :plans do |t|
      t.string :name
      t.string :stripe_product_id

      t.timestamps
    end

    create_table :subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true

      # I'm going with explicit columns for the Stripe IDs because it's much easier to understand this logic rather than making it very abstract. Most likely we'll stick with Stripe down the line, so it's not a big deal.
      t.string :stripe_customer_id
      t.string :stripe_subscription_id

      t.timestamps
    end

    create_table :features do |t|
      t.string :name, null: false
      t.references :plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
