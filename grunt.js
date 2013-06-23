module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'js/**/*.js']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                node: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true              
            },
            globals: {
                Commands: true,
                Interpreter: true,
                sinon: true
            }
        }
    });
    
    grunt.registerTask('default', 'lint');
};
