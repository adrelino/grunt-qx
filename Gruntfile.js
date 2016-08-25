/*
 * grunt-qx-build
 * https://github.com/drawstack/grunt-qx-build
 *
 * Copyright (c) 2016 Rene Jochum
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  var qxpath = '../vendor/qooxdoo';
  if ('QOOXDOO_PATH' in process.env) {
    qxpath = process.env.QOOXDOO_PATH;
  }

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run
    qxcompiler: {
      options: {
        appClass: 'qxc.tweets.Application',
        appName: 'qxc.tweets',
        appTitle: 'qxc.tweets Demo',
        theme: 'qxc.tweets.theme.Theme',
        locales: ['en', 'de'],
        addScript: [],
        addCss: [],
        libraryDirs: [
          qxpath + '/framework',
          'demo/qxc.tweets'
        ]
      },

      source: {
        options: {
          target: 'source',
          outDir: 'demo/qxc.tweets/build/source/'
        }
      },

      build: {
        options: {
          target: 'build',
          outDir: 'demo/qxc.tweets/build/build/',
          // Only available within the 'build' target.
          minify: true
        }
      },

      hybrid: {
        options: {
          target: 'hybrid',
          outDir: 'demo/qxc.tweets/build/hybrid/'
        }
      }
    },

    watch: {
      tweets: {
        files: [
          'demo/qxc.tweets/source/class/**/*.js'
        ],
        tasks: ['qxcompiler:source']
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: 'demo/qxc.tweets/build/',
          port: 8000
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('lint', ['jshint']);

  // Compile source, run server and watch it
  grunt.registerTask('serve', [
    'qxcompiler:source',
    'connect:server',
    'watch'
  ]);

  // lint by default
  grunt.registerTask('default', ['lint']);
};
