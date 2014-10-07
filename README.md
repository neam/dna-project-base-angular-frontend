Gapminder Go for Desktop
========================

This is the desktop version of the Gapminder Go project. The app is built with AngularJS and utilizes
a separate mock API app for simulating real API calls in development and testing environments.

## Setup

Requirements: *Node*, *Ruby*, *Gapminder Go Mock API*

Before running this application in development, you will need to have the
[Gapminder Go Mock API](https://github.com/Gapminder/gapminder-go-mock-api) installed. Please refer
to its README.md file for setup instructions.

To install the app, run:

    sudo npm install -g bower
    sudo npm install -g sails
    sudo npm install -g nodemon
    sudo npm install -g karma-cli
    npm install
    bower install
    sudo gem install sass
    sudo gem install compass

Copy `assets/js/app/config/local.dist.js` and name it `local.js`.

## Run the app in development

    nodemon

Now launch your web browser and navigate to `http://localhost:1337`.

## Run the app in production

Set the correct base API URL (baseApiUrl) in `assets/js/app/config/local.js`. This should be a URL
pointing to the actual Gapminder API (e.g. `http://gapminder.org/api`). Also, be sure to set the
application's base URL (e.g. `http://go.gapminder.org`) and port (e.g. `80`).

Install Forever:

    sudo npm install -g forever

Then run the app:

    forever start app.js

## Run the tests

You will need to have Google Chrome installed in order to run the tests.

    karma start
