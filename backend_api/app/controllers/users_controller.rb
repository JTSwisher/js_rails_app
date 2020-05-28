class UsersController < ApplicationController

    def create
        user= User.find_by(username: params["username"])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
        else
            user = User.create(username: params["username"], password:["password"])
            session[:user_id] = user.id
        end 
    end 

    private 

    def user_params
       params.require(:user).permit(:username, :password)
    end

end
