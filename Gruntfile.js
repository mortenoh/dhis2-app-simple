module.exports = function( grunt ) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
    },

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
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app/',
          hostname: 'localhost',
          middleware: function( connect, options ) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [
              proxy,
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        },
        proxies: [
          {
            context: '/api',
            host: '127.0.0.1',
            port: 8080,
            https: false,
            changeOrigin: false,
            xforward: false,
            headers: {
              "Authorization": "Basic YWRtaW46ZGlzdHJpY3Q="
            }
          }
        ]
      }
    }
  });

  grunt.registerTask('server', [
    'configureProxies:server',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
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

  grunt.registerTask('default', [ 'build' ]);
};
