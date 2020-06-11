Rails.application.routes.draw do

  resources :users, only: [:create] do 
    resources :gifs, only: [:index, :create, :destroy]
  end 
  resources :messages, only: [:create]
 

end
