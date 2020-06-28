class UsersController < ApplicationController

    def create()
        if  user = User.find_by(username: params["username"]) 
           if user.authenticate(params[:password])
            render json: user
           else
            render json: {errors: 'Error signing in, please try again.'}
           end 
        else #create new user if existing user not found
            user = User.new(user_params)
            if user.save
                render json: user
            else 
                render json: {errors: 'Error signing up, please try again.'}
            end 
        end 
    end 

private 

    def user_params
      params.permit(:username, :password)
    end

end
