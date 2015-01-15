Gapminder Pages for Desktop
===========================

This is the desktop version of the Gapminder Pages project. The app is built with AngularJS and utilizes
the *Gapminder Mock API* for simulating real API calls in development and testing environments.

## Setup

Requirements: *Node*, *Ruby*, *Gapminder Mock API*, [*s3cmd*](http://s3tools.org/s3cmd) (for deployment)

Before running this application in development, you will need to have the
[Gapminder Mock API](https://github.com/Gapminder/gapminder-mock-api) installed. Please refer
to its README.md file for setup instructions.

To install *Gapminder Pages for Desktop*, run:

    gem install sass compass

    npm install -g bower karma-cli

    npm install
    bower install

    cp .env.dist .env

In the `.env` file, replace `YOUR_S3_ACCESS_KEY` and `YOUR_S3_SECRET` with your S3 credentials.

## Run in development

    grunt

Now launch your web browser and navigate to `http://localhost:1335/#/exercises/ejercicio-con-video`.

## Deploy to production

URL: [http://www.gapminder.org/{route}](http://www.gapminder.org/{route})

    ./deploy.sh production

Specify a different API base URL (e.g. http://www.gapminder.org/api/v2):

    ./deploy.sh production <API BASE URL>

## Deploy to branch

URL: [http://static.gapminder.org/pages-desktop/{branch}](http://static.gapminder.org/pages-desktop/{branch})

    ./deploy.sh branch <BRANCH NAME>

## Deploy to stage

URL: [http://static.gapminder.org/pages-desktop-stage](http://static.gapminder.org/pages-desktop-stage)

    ./deploy.sh stage

Specify a different API base URL (e.g. http://stage.gapminder.org/api/v2):

    ./deploy.sh stage <API BASE URL>

## Deploy to stage and use Mock API

URL: [http://static.gapminder.org/pages-desktop-stage-with-mock](http://static.gapminder.org/pages-desktop-stage-with-mock)

Deploy a stage version that uses the Gapminder Mock API:

    ./deploy.sh stage-mock

## View unit test coverage

While your development server is running, browse to:

    http://localhost:1335/coverage/
