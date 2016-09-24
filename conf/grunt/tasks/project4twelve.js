module.exports = function moduleExports( grunt ){
    "use strict";

    grunt.registerTask( "project4twelve", function gruntRegisterTask(){
        var tasks = [
            "scan",
            "eslint:project4twelve",
            "webpack:project4twelve",
            "replace",
            "concat:project4twelve",
            "uglify:project4twelve",
            "style"
        ];

        grunt.task.run( tasks );
    } );
};
