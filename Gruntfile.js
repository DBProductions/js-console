module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            allFiles: ['grunt.js', 
                       '<%= pkg.srcDir %>**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jasmine: {
            pivotal: {
                src: '<%= pkg.srcDir %>**/*.js',
                options: {
                    specs: '<%= pkg.specDir %>/**/*.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', ['jshint']);
};
