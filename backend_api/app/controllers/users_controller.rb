class UsersController < ApplicationController

    def create()
        user = User.find_by(username: params["username"])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            
            user = User.create(user_params)
            session[:user_id] = user.id
            render json: user
        end 
    end 

private 

    def user_params
      params.permit(:username, :password)
    end

end
