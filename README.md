# GIFBook

GIFBook is a Javascript SPA with a rails API backend intended to allow users to search and save their favorite GIFs to their account as well as send GIFs via SMS text.

## Demo
 [GIFBook Video Demo](https://www.youtube.com/watch?v=YmzzK6cdKy4)

![Walkthrough](demo/walkthrough.gif)

## Built With

* [Javascript](https://www.javascript.com/)
* [Rails](https://guides.rubyonrails.org/)
* [PostgreSQL](https://www.postgresql.org/)

#### External APIs

* GIFs - [Giphy](https://developers.giphy.com/)
* SMS Text - [Twilio](https://www.twilio.com/docs/usage/api)


## Getting Started

These instructions will get a local copy of GIFBook up and running on your machine.

### Prerequisites

* [Javascript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [Rails](https://guides.rubyonrails.org/)
* [PostgreSQL](https://www.postgresql.org/)

### API Keys

You will need to acquire your own Account SID and Authentication token from Twilio. Create a .env file in the root directory of the backend_api folder.

#### Example .env File

```

export TWILIO_ACCOUNT_SID="Twilio SID"
export TWILIO_ACCOUNT_AUTH="Twilio Auth Token"

```


### Installation

Fork and clone this Repo.

#### Backend
Change directories into the backend local directory. Run bundle install to install dependencies. Ensure PostgreSQL is running on your machine, create and migrate the database.
```
$cd backend_api
$bundle install
$rails db:create
$rails db:migrate
```
* Start the rails server from the 'backend_api' directory by running ``rails s``.

#### Frontend

```
$cd frontend
$ open index.html
```

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Authors

[Jeff Swisher](https://github.com/JTSwisher)