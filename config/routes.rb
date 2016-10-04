Rails.application.routes.draw do

  root 'application#home'

  resources :posts

end
