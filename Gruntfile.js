module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src:  ['js/**/*.js', '!**/modernizr.js'],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: [
          {
            src:  'build/js/<%= pkg.name %>.js',
            dest: 'dist/js/<%= pkg.name %>.min.js'
          },
          {
            src:  'js/lib/modernizr.js',
            dest: 'dist/js/modernizr.min.js'
          }
        ]
      }
    },
    clean: {
      dist: {
        src: ['build']
      }
    }
  });

  var tasks = [
    'grunt-contrib-uglify',
    'grunt-contrib-concat',
    'grunt-contrib-clean'
  ]
  tasks.forEach(function(t) {
    grunt.loadNpmTasks(t);
  });

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'clean']);
};