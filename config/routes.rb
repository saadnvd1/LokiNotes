Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }

  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  devise_scope :user do
    get '/logged_in', to: 'sessions#logged_in?'
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
