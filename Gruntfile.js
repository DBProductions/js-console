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
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: { 
                    paths: '<%= pkg.srcDir %>',
                    outdir: '<%= pkg.docsDir %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    
    grunt.registerTask('default', ['jshint', 'yuidoc']);
};
