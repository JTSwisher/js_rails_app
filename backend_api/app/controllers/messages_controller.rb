class MessagesController < ApplicationController

    def create
        Message.new_message(params["number"], params["message"])
    end 


end 