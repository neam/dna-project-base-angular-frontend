Angular Frontend
===========================

The frontend is built with AngularJS.

## Setup

Requirements: *Node*, *Ruby*, [*s3cmd*](http://s3tools.org/s3cmd) (for deployment)

To install, run:

    gem install sass compass

    npm install -g bower karma-cli

    npm install
    bower install

    cp .env.dist .env

Add your S3 credentials to your local configuration file `.env`.

## Run in development

    grunt

Now launch your web browser and navigate to [http://localhost:1335/]().

## Deploy to production

URL: [http://www.example.com/{route}](http://www.example.com/{route})

    ./deploy.sh master-manager

## Deploy a specific branch to stage

URL: [http://static.example.com/stage/{branch}](http://static.example.com/stage/{branch})

    ./deploy.sh <APPNAME>

Specify a different API base URL (e.g. http://www.example.com/api/v2):

    ./deploy.sh <APPNAME> <API BASE URL>

## View unit test coverage

While your development server is running, browse to:

    http://localhost:1335/coverage/
