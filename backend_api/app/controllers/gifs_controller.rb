class GifsController < ApplicationController

   def index
      gifs = Gif.all.where(:user_id => params["user_id"])
      render json: gifs, only: [:id, :url, :user_id]
   end 

   def create
      gif = Gif.find_or_create_by(url: params["gif_url"]).where(user_id: params["user_id"])
   end 

   def destroy

   end
    
end




