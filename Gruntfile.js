module.exports = function(grunt) {

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less:{
            development:{
                options:{
                    paths:['css'],
                    compress : true,
                    ieCompat: true,
                    sourceMap: true
                },
                files:{
                    'css/style.min.css': 'less/style.less'
                }
            }
        },

        watch: {
            options: {
                livereload: false,
                debounceDelay: 100,
                spawn: false
            },
            less: {
                files: ['less/style.less', 'css/style.min.css'],
                tasks: ['less']
            },
        },

    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task(s).
    grunt.registerTask('default', ['less']);

};