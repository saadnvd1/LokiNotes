object false

child current_user => :user do
  attributes :id, :name, :first_name, :last_name, :meta
end

node :token do
  current_token
end
