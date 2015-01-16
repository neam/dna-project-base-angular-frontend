var crypto = require('crypto'),
    currentDate = (new Date()).valueOf().toString(),
    random = Math.random().toString(),
    buildHash = crypto.createHash('sha1').update(currentDate + random).digest('hex');

module.exports = {
  development: {
    options: {
      data: {
        baseApiUrl: '<%= baseApiUrlDevelopment %>',
        assetUrl: '<%= assetUrlDevelopment %>',
        html5Mode: '<%= html5ModeDevelopment %>',
        version: '<%= package.version %>',
        buildHash: buildHash
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  },
  production: {
    options: {
      data: {
        baseApiUrl: '<%= baseApiUrlProduction %>',
        assetUrl: '<%= assetUrlProduction %>',
        html5Mode: '<%= html5ModeProduction %>',
        version: '<%= package.version %>',
        buildHash: buildHash
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  },
  stage: {
    options: {
      data: {
        baseApiUrl: '<%= baseApiUrlStage %>',
        assetUrl: '<%= assetUrlStage %>',
        html5Mode: '<%= html5ModeStage %>',
        version: '<%= package.version %>',
        buildHash: buildHash
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  }
};
