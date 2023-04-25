Sentry.init do |config|
  config.dsn = "https://bb29f06cd0564755aafa3c6c43dfa8a8@o4505018052182016.ingest.sentry.io/4505018052182016"
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  config.enabled_environments = %w[production]

  # Set traces_sample_rate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end
