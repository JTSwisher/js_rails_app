class MessagesController < ApplicationController

    def create
        Message.new_message(params["number"], params["message"], params["gif"])
    end 

end 