module.exports = function productionTaskGenerator( grunt ){
    "use strict";

    /** This should run on production servers **/
    grunt.registerTask( "production", function productionTaskRegistrant(){
        var tasks;

        tasks = [
            "scan",
            "eslint:src",

            "webpack:project4twelve",
            "replace",
            "concat:project4twelve",
            "uglify:project4twelve",
            "style",
            "copy:cordova"
        ];

        grunt.task.run( tasks );
    } );
};
