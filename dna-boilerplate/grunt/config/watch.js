module.exports = {
  dnaJs: {
    files: [
      '<%= paths.dna %>/**/*.js'
    ],
    tasks: [
      'concat:dna',
      'copy:assetsDevelopment',
      'copy:dna',
      'sync:main'
    ]
  },
  dna: {
    files: [
      '<%= paths.dna %>/**'
    ],
    tasks: [
      'copy:dna',
      'sync:main'
    ]
  }
};
