Gapminder Go for Desktop
========================

This is the desktop version of the Gapminder Pages project. The app is built with AngularJS and utilizes
the *Gapminder Mock API* for simulating real API calls in development and testing environments.

## Setup

Requirements: *Node*, *Ruby*, *Gapminder Mock API*

Before running this application in development, you will need to have the
[Gapminder Mock API](https://github.com/Gapminder/gapminder-mock-api) installed. Please refer
to its README.md file for setup instructions.

To install the app, run:

    sudo gem install sass
    sudo gem install compass

    sudo npm install -g bower
    sudo npm install -g karma-cli

    npm install
    bower install

## Run the app in development

    grunt

Now launch your web browser and navigate to `http://localhost:1337`.

## Run the tests

You will need to have Google Chrome installed in order to run the tests.

    karma start
