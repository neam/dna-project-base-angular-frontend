module.exports = {
  options: {
    separator: "\n"
  },
  dna: {
    src: [
      '<%= paths.dna %>/js/*.js',
    ],
    dest: '<%= paths.tmpCompile %>/assets/js/dna.js'
  },
  dnaVendor: {
    src: [
    ],
    dest: '<%= paths.tmpDist %>/assets/js/dna-vendor.js'
  }
};
