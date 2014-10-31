Gapminder Pages for Desktop
===========================

This is the desktop version of the Gapminder Pages project. The app is built with AngularJS and utilizes
the *Gapminder Mock API* for simulating real API calls in development and testing environments.

Stage URL: [http://static.gapminder.org/pages-desktop-stage](http://static.gapminder.org/pages-desktop-stage)

## Setup

Requirements: *Node*, *Ruby*, *Gapminder Mock API*

Before running this application in development, you will need to have the
[Gapminder Mock API](https://github.com/Gapminder/gapminder-mock-api) installed. Please refer
to its README.md file for setup instructions.

To install *Gapminder Pages for Desktop*, run:

    sudo gem install sass
    sudo gem install compass

    sudo npm install -g bower
    sudo npm install -g karma-cli

    npm install
    bower install

## Run the app in development

    grunt

Now launch your web browser and navigate to `http://localhost:1337`.

## Deploy to stage

    ./deploy_to_stage.sh <S3 ACCESS KEY> <S3 SECRET>

Specify a different API base URL (e.g. http://stage.gapminder.org/api/v2):

    ./deploy_to_production.sh <S3 ACCESS KEY> <S3 SECRET> <API BASE PATH>

## Deploy to production

    ./deploy_to_production.sh <S3 ACCESS KEY> <S3 SECRET>

Specify a different API base URL (e.g. http://www.gapminder.org/api/v2):

    ./deploy_to_production.sh <S3 ACCESS KEY> <S3 SECRET> <API BASE PATH>

## Run the tests

You will need to have Google Chrome installed in order to run the tests.

    karma start
