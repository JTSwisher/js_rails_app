class UsersController < ApplicationController

    def create()
        if  user = User.find_by(username: params["username"]) 
           if user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
           else
            render json: {errors: 'Error signing in, please try again.'}
           end 
        elsif
            user = User.new(user_params)
            if user.save
                session[:user_id] = user.id
                render json: user
            else 
                render json: {errors: 'Error signing in, please try again.'}
            end 
        end 
    end 

private 

    def user_params
      params.permit(:username, :password)
    end

end
