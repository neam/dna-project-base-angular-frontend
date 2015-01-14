module.exports = {
  options: {
    indent: '\t'
  },
  bower: {
    src: 'package.json',
    dest: 'bower.json',
    fields: {
      name: 'name',
      version: 'version',
      authors: 'authors',
      description: 'description',
      repository: 'repository',
      license: 'license'
    }
  }
};
