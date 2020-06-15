# GIFBook

The app utilizes the Giphy and Twilio APIs and allows users to save their favorite GIFs to their account and send GIFs to their desired receipient via SMS text.

## Demo
 [GIFBook walkthrough](https://www.youtube.com/watch?v=YmzzK6cdKy4)


## Installation

To run the app, you will need to fork and clone this repo.

You will need to cd into the project directory and then into the backend 'backend_api' and run ``bundle install``. All the gem dependancies will be installed.

You will need to have PostgreSQL and Rails installed.
* Run your PostgreSQL server for the DB on your local machine.
* Start the rails server from the 'backend_api' file by running ``rails s``.
* Once the Rails server is running, you can open the index.html file from the 'frontend' file.


## Creating the Database
Navigate to the 'backend_api' folder and run the following:

* rails db:create
* rails db:migrate


## Dependencies 
* [Javascript](https://www.javascript.com/) - Frontend
* [Rails](https://guides.rubyonrails.org/) - API Backend
* [PostgreSQL](https://www.postgresql.org/) - Database

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## Authors

[Jeff Swisher](https://github.com/JTSwisher)

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).