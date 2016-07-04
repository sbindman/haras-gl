module.exports = function(grunt) {

    //USING COMMON GRUNT PLUGINS
    //watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    //uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //csslint
    grunt.loadNpmTasks('grunt-contrib-csslint');
    //compile less
    grunt.loadNpmTasks('grunt-contrib-less');
    //concat
    grunt.loadNpmTasks('grunt-contrib-concat');

    //configuration for grunt plugins
    grunt.initConfig({
        /* These are the configs for the uglify(minify) taskrunner
         * run uglify whenever js changes
         */
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'public/build/kickstart_js.js': [
                    //js to be uglified
                        //app
                        'public/app.js',
                        //config
                        'public/app/config.js',
                        //controllers
                        'public/app/controllers/login.js',
                        'public/app/controllers/main.js',
                        'public/app/controllers/map.js',
                        //services
                        'public/app/services/dataService.js',
                        'public/app/services/mapService.js',
                        'public/app/services/stateService.js'
                    ]
                }
            },
            //css: {
            //    files: {
            //        'public/build/kickstart_css.css' : [
            //        //css to be uglified
            //            'public/app/styles/main.css',
            //            'public/app/styles/map.css'
            //        ]
            //    }
            //}
        },
        /* These are the configs for the less compiler taskrunner
         * run less whenever css changes
         */
        less: {
            development: {
                files: {
                    'public/build/kickstart_css.css': [
                        //less to be compiled
                        'public/app/styles/main.less',
                        'public/app/styles/map.less',
                        'public/app/styles/index.less'
                    ]
                }
            }
        },
        /* These are the configs for the watch taskrunner
         * run uglify whenever js changes
         */
        watch: {
            js: {
                //if any of these files change
                files: ['public/app/**/*.js'],
                //run these tasks
                tasks: ['concat:js']
            },
            less: {
                //if any of these files change
                files: ['public/app/**/*.less'],
                //run these tasks
                tasks: ['less']
            }
        },
        /* These are the configs for the css taskrunner
         * run css lint before uglifying
         */
        jshint: {
            all: ['Gruntfile.js', 'public/app/**/*.js']
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['public/build/*.css']
            }
        },
        concat: {
            dist: {
              src: [
                    //js to be uglified
                        //app
                        'public/app.js',
                        //config
                        'public/app/config.js',
                        //services
                        'public/app/services/dataService.js',
                        'public/app/services/mapService.js',
                        'public/app/services/stateService.js',
                        //controllers
                        'public/app/controllers/login.js',
                        'public/app/controllers/main.js',
                        'public/app/controllers/map.js'
                    
                    ],
                dest: 'public/build/kickstart_concat_js.js',
            },
          },
    });
    //a new task called build uglifies everything
    grunt.registerTask('build', ['less', 'concat']);
}