cp -r dna-boilerplate/* ../angular-frontend-dna/
cp -r dna-boilerplate/.config ../angular-frontend-dna/
cp .deploy-secrets.dist .deploy-secrets

npm install && bower install

Grunt file is based on Yeoman angular generator with some changes. There are three main task that you can do:

    grunt live #to launch a browser sync server on your source files
    grunt server #to launch a server on your optimized application
    grunt build #to build an optimized version of your application in /dist
