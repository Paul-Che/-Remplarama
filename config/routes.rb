Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :users
  root to: 'pages#home'

  get 'search', to: 'users#search'

  resources :users, except: [:index] do
    resources :slots, only: [:create, :update, :destroy]
    resources :bookings, only: [:create, :update, :destroy]
    resources :reviews, only: [:new, :create, :edit, :update, :destroy]
  end

  mount Attachinary::Engine => "/attachinary"

end
