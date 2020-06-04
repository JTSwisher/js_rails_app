class GifsController < ApplicationController

   def index
      gifs = Gif.all.where(:user_id => params["user_id"])
      render json: gifs
      binding.pry
   end 

   def create
      @gif = Gif.create(url: params["gif_url"], user_id: params["user_id"])
      redirect_to user_gifs_path(@gif.user_id)
   end 

   def destroy

   end
    
end
