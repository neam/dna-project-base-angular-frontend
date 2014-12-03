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

    sudo gem install sass
    sudo gem install compass

    sudo npm install -g bower
    sudo npm install -g karma-cli

    npm install
    bower install

## Run in development

    grunt

Now launch your web browser and navigate to `http://localhost:1335`.

## Deploy to production

URL: [http://www.gapminder.org/{route}](http://www.gapminder.org/{route})

    ./deploy.sh production <S3 ACCESS KEY> <S3 SECRET>

Specify a different API base URL (e.g. http://www.gapminder.org/api/v2):

    ./deploy.sh production <S3 ACCESS KEY> <S3 SECRET> <API BASE URL>

## Deploy to branch

URL: [http://static.gapminder.org/pages-desktop/{branch}](http://static.gapminder.org/pages-desktop/{branch})

    ./deploy.sh branch <S3 ACCESS KEY> <S3 SECRET> <BRANCH NAME>

## Deploy to stage

URL: [http://static.gapminder.org/pages-desktop-stage](http://static.gapminder.org/pages-desktop-stage)

    ./deploy.sh stage <S3 ACCESS KEY> <S3 SECRET>

Specify a different API base URL (e.g. http://stage.gapminder.org/api/v2):

    ./deploy.sh stage <S3 ACCESS KEY> <S3 SECRET> <API BASE URL>

## Deploy to stage and use Mock API

URL: [http://static.gapminder.org/pages-desktop-stage-with-mock](http://static.gapminder.org/pages-desktop-stage-with-mock)

Deploy a stage version that uses the Gapminder Mock API:

    ./deploy.sh stage-mock <S3 ACCESS KEY> <S3 SECRET>
