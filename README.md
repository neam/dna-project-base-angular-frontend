Shared code to provide Angular-based Frontends for DNA Projects

# Structure

## angular-frontend

## angular-frontend-dna

angular-frontend/init/...js is the entrypoint for webpack, which requires angular-frontend-dna/index.js and then bootstraps angular
this makes index.js the de facto entry-point in the perspective of the project.

app.js takes care of loading the resources necessary to load the landing page

data-environment-specific.js includes all data-environment-specific dependencies that are necessary for a rich user experience after the user has logged in and has an active data environment.

# Initiate a new angular-frontend app

cp -r dna-boilerplate/* ../angular-frontend-dna/
cp -r dna-boilerplate/.config ../angular-frontend-dna/
cp .deploy-secrets.dist .deploy-secrets

# Grunt-related (old - remove)

npm install -g grunt-cli bower

npm install && bower install

Grunt file is based on Yeoman angular generator with some changes. There are three main task that you can do:

    grunt live #to launch a browser sync server on your source files
    grunt server #to launch a server on your optimized application
    grunt build #to build an optimized version of your application in /dist
