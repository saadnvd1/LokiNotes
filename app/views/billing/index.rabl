object false

node :prices do
  @prices
end

node :is_on_trial do
  current_user.on_trial?
end

node :premium do
  current_user.premium?
end
