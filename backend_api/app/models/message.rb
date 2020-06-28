class Message < ApplicationRecord
    require 'twilio-ruby'

    def self.new_message(number, message, url)
        account_sid = ENV["TWILIO_ACCOUNT_SID"]
        auth_token = ENV["TWILIO_ACCOUNT_AUTH"]

        # set up a client to talk to the Twilio REST API
        client = Twilio::REST::Client.new(account_sid, auth_token)
        
        from = '+12084081231' # App Twilio number
        to = "#{number}" 
        
        client.messages.create(
        from: from,
        to: to,
        body: "#{message}",
        media_url: ["#{url}"]
        )
    end 

end 
