source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.3"

gem "devise"
gem "devise-jwt"
gem "ancestry"
gem "active_interaction", "~> 5.2"
gem "rabl"
gem "oj"
gem "cancancan"
gem "stripe"
gem "fog-aws"
gem "paper_trail"
gem "rails", "~> 7.0.4", ">= 7.0.4.2"
gem "sprockets-rails"
gem "pg", "~> 1.1"

gem "rack-cors"
gem "carrierwave", ">= 3.0.0.beta", "< 4.0"
gem "sentry-ruby"
gem "sentry-rails"
gem "newrelic_rpm"
gem "puma", "~> 5.6"
gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

group :development, :test do
  gem "pry", "~> 0.13.1"
  gem "rspec-rails", "~> 6.0.0"
  gem "standard"
end

group :development do
  gem "annotate"
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end

gem "shakapacker", "= 6.6"

gem "sidekiq", "~> 7.0"
gem "sidekiq-cron"
