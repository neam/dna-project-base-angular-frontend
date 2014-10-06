Gapminder Go for Desktop
========================

This is the desktop version of the Gapminder Go project. The app is built with AngularJS and utilizes
a separate mock API app for simulating real API calls in development and testing environments.

## Setup

Requirements: *Node*, *Ruby*

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

## Run the app

    nodemon

Now launch your web browser and navigate to `http://localhost:1337`.

## Run the tests

You will need to have Google Chrome installed in order to run the tests.

    karma start
