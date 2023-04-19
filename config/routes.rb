require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }

  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    username == Rails.application.credentials.sidekiq[:username] && password == Rails.application.credentials.sidekiq[:password]
  end

  mount Sidekiq::Web => '/sidekiq'

  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'logged_in', to: 'home#check_logged_in'
  get 'notes', to: 'home#notes'

  resources :notes, only: [:update, :index, :create]
  resources :notebooks, only: [:create, :update]
  resources :images, only: [:create]

  resources :billing, only: [:index] do
    collection do
      post 'create_session_checkout'
      post 'success'
      post 'webhook'
      get 'check_subscription_status'
      get 'get_subscription'
      post 'create_customer_portal_session'
    end
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
