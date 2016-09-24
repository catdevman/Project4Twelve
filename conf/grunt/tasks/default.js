module.exports = function moduleExports( grunt ){
    "use strict";

    /** This is what will run if you don't give Grunt any directions **/
    grunt.registerTask( "default", function gruntRegisterTask(){
        var tasks = [
            "scan",
            "eslint:src",

            "webpack:project4twelve",
            "replace",
            "concat:project4twelve",
            "uglify:project4twelve",

            "postcss:lint",
            "sass",
            "postcss:build",
            "cssmin",

            "message:default"
        ];

        grunt.task.run( tasks );
    } );
};
