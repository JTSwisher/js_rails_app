class User < ApplicationRecord
    has_secure_password
    has_many :gifs

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
