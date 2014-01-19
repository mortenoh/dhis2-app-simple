module.exports = function( grunt ) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: {
        dot: true,
        src: [
          'dist/',
          '.tmp/'
        ]
      }
    },

    copy: {
      'vendor': {
        expand: true,
        flatten: true,
        src: [
          'app/bower_components/font-awesome/fonts/*'
        ],
        dest: 'dist/fonts/'
      }
    },

    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        src: [
          'dist/js/**/*.js',
          'dist/css/**/*.css'
        ]
      }
    },

    useminPrepare: {
      options: {
        dest: 'dist/'
      },
      html: 'app/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['dist/']
      },
      html: ['dist/{,*/}*.html'],
      css: ['dist/css/{,*/}*.css']
    },

    htmlmin: {
      dist: {
        options: {
        },
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: '*.html',
            dest: 'dist/'
          }
        ]
      }
    },

    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/js/',
            src: [
              '**/*.js',
              '!vendor.js',
              '!vendor.min.js'
            ],
            dest: '.tmp/concat/js/'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'useminPrepare',
    'concat',
    'htmlmin',
    'cssmin',
    'ngmin',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ]);
};
