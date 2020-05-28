class User < ApplicationRecord
    has_many :gifs

    validates :username, presence: true
    validates :username, uniqueness: true

    validates :password, presence: true
    validates :password, confirmation: { case_sensitive: true }

end
