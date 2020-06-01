class Message < ApplicationRecord
    require 'twilio-ruby'

    def self.new_message(number, message)

        account_sid = ENV["TWILIO_ACCOUNT_SID"]
        auth_token = ENV["TWILIO_ACCOUNT_AUTH"]

        client = Twilio::REST::Client.new(account_sid, auth_token)
        
        from = '+12084081231' # Your Twilio number
        to = "14804549839" # Your mobile phone number
        
        client.messages.create(
        from: from,
        to: to,
        body: "#{message}",
        #media_url: ["#{url}"]
        )
    end 

end 