class GifsController < ApplicationController

   def index
      gifs = Gif.all.where(:user_id => params["user_id"])
      render json: gifs, only: [:id, :url, :user_id]
   end 

   def create
      gif = Gif.find_or_create_by(url: params["gif_url"], user_id: params["user_id"])
   end 

   def destroy
      gif = Gif.find_by(id: params["id"])
      gif.destroy
   end
    
end




