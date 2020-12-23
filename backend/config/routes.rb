Rails.application.routes.draw do
  resources :scores, only: [:index, :show]
  resources :games, only: [:create, :update]
  resources :users, only: [:index, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
