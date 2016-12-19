Rails.application.routes.draw do

  root 'application#home'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  resources :posts do
    collection do
      get 'master'
    end
  end

end
