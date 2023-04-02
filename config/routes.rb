Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }

  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'logged_in', to: 'home#check_logged_in'
  get 'notes', to: 'home#notes'

  resources :notes, only: [:update, :index, :create]
  resources :notebooks, only: [:create]

  resources :billing, only: [:index] do
    collection do
      post 'create_session_checkout'
      post 'success'
    end
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
