Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # TODO_PROD: don't enable this on prod
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :patch, :put]
  end
end