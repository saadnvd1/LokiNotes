object @subscription

attributes :id

node :price_formatted do |subscription|
  plan = subscription.stripe_subscription.plan
  "#{number_to_currency((plan.amount / BigDecimal("100")))}/#{plan.interval}"
end

node :plan_name do |subscription|
  "LokiNotes #{subscription.plan.name}"
end
