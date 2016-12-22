Rails.application.routes.draw do

  root 'application#home'

  get 'signup' => 'users#new'
  get 'login' => 'sessions#new'
  get 'logout', to: 'sessions#destroy'

  resources :posts do
    collection do
      get 'master'
    end
  end
  
  resources :users
  resources :sessions, only: [:create, :destroy]

end
