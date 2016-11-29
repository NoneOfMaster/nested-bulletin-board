Rails.application.routes.draw do

  root 'application#home'

  resources :posts do
    collection do
      get 'master'
      post 'master' => 'posts#create'
    end
  end

end
