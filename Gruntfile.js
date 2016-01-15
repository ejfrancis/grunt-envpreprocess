/*
 * envpreprocess
 * https://github.com/ejfrancis/grunt-envpreprocess
 *
 * Copyright (c) 2015 ejfrancis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    envpreprocess: {
      dev: {
        files:{
          src:  'demo/config/env.json'
        },
        options:{
          //replace ENV variables in demo/build_output dir
          replacePath: ['demo/build_output/**/*.*'],
          environment: 'dev'
        }
      }
    },
    copy:{
      //copy files to demo/build_output dir
      main:{
        files:[
          {
            expand:true,
            src: ['demo/**'],
            dest: 'demo/build_output/'
          }
        ]
      }
    },
    //clean the demo/build_output dir
    clean:['demo/build_output/']
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('default', ['clean','copy:main', 'envpreprocess:dev']);

};
