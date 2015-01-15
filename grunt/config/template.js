module.exports = {
  development: {
    options: {
      data: {
        baseApiUrl: '<%= baseApiUrlDevelopment %>',
        assetUrl: '<%= assetUrlDevelopment %>',
        html5Mode: '<%= html5ModeDevelopment %>',
        userappId: '<%= userappIdDevelopment %>',
        version: '<%= package.version %>'
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
        userappId: '<%= userappIdProduction %>',
        version: '<%= package.version %>'
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
        userappId: '<%= userappIdStage %>',
        version: '<%= package.version %>'
      }
    },
    files: {
      '<%= paths.tmpDist %>/index.html': ['<%= paths.src %>/index.html']
    }
  }
};
