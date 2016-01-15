/*
 * envpreprocess
 * https://github.com/Evan/grunt_plugin_test
 *
 * Copyright (c) 2015 evanjf
 * Licensed under the MIT license.
 */

/*

    options format:
    options: {
        configPath: 'config/env.json',
        srcDir: 'app/'
    }

*/

'use strict';

var textReplace = require('../grunt-text-replace');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('envpreprocess', 'preprocess environment variables', function() {      
      
    //default environment to 'dev', and grab destination
    var environment = this.target || "dev",
        dest = this.data.options.replacePath;
        //dest = this.data.files.dest;
      
          //read environment parameter passed in
    if(this.data.options.environment){
        environment = this.data.options.environment;
    }
      
    var optionsForReplace = this.options({
        src: [dest],
        overwrite:true,
        replacements: []
    });
      
    this.files.forEach(function(f) {
        //grab src
        var src = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
        });
        
        grunt.log.writeln("Reading ENV variables from " + src[0]);

        //load config into object from src
        var config = grunt.file.readJSON(src[0]);
        var replacementsArr = [];
        
        //iterate over each config variable key
        var configKeys = Object.keys(config).forEach(function(key){
            var val = null,
                warned = false;
            //grab value and string to replace
            if(!config[key][environment]){
                //check for a "*" if no matching environment var
                if(!config[key]["*"]){
                    grunt.log.warn("WARNING: No corresponding ENV variable for " + key);   
                    warned = true;
                }else{
                    val = config[key]["*"];
                }
            }
            //grab corresponding ENV var
            if(val == null ){
               val = config[key][environment];  
            }
            if(val == null){
                if(!warned){
                    grunt.log.warn("WARNING: No corresponding ENV variable for " + key); 
                }
            }
            var replaceString = "ENV." + key;

            //add to replacements array
            replacementsArr.push({
                from: replaceString,
                to: val
            });
            
           
        });

        optionsForReplace.replacements = replacementsArr;
        try{
            textReplace.replace({
                src: dest,
                overwrite: true,
                replacements:replacementsArr
              });
            grunt.log.writeln("Replaced all ENV variables in " + dest);

        }
        catch(err){
            grunt.log.error("ERROR: Envpreprocess replace error: " + err);   
        }
    });
  });

};

    /*"grunt-text-replace" : "~0.4.0",
    "extend-grunt-plugin" : "~0.1.0",
    "recursive-readdir":"~1.2.1",*/

