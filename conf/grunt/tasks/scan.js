module.exports = function( grunt ){
    "use strict";

    grunt.registerTask( "scan", "Scan and normalize static or generated content", function(){
        grunt.task.run( [
            "copy:content",
            "copy:build",
            "copy:data",
            "clean-old-build-files"
        ] );
    } );
};
