Rails.application.routes.draw do
  resources :scores, only: [:index, :show]
  resources :games, only: [:index, :create, :update, :show]
  resources :users, only: [:index, :show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
