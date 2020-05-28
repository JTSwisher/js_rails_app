class UsersController < ApplicationController

    def create
        #raise binding.pry
        user = User.create(username: params["username"], password:["password"])
    end 

    private 

   # def user_params
    #    params.require(:user).permit(:username, :password)
   # end

end
