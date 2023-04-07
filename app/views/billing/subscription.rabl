object @subscription

attributes :id

node :price_formatted do |subscription|
  plan = subscription.stripe_subscription.plan
  "#{number_to_currency((plan.amount/100.to_d))}/#{plan.interval}"
end

node :plan_name do |subscription|
  "LokiNotes #{subscription.plan.name}"
end