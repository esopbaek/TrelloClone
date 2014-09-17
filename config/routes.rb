TrelloClone::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :destroy, :index]
    resources :cards, only: [:create, :update, :destroy]
    resources :items, only: [:index, :create, :update, :destroy]
    post 'cards/swapranks', to: 'cards#swap_ranks'
    post 'lists/swapranks', to: 'lists#swap_ranks'  

    # resources :items
    # resources :board_memberships
    # resources :card_assignments
  end
end
