class AddPlansAndPricesToStripe < ActiveRecord::Migration[7.0]
  def change
    plan = Plan.create!(name: "Pro", stripe_product_id: "prod_NdmX9EnerC9wXh")

    Price.create!(plan: plan, name: "Monthly", stripe_price_id: "price_1MsUxxFX51BBY2GUXXx2oX81")
    Price.create!(plan: plan, name: "Yearly", stripe_price_id: "price_1MsV0nFX51BBY2GUAhL1L6uO")
  end
end
