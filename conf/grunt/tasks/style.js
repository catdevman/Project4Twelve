module.exports = function( grunt ){
    "use strict";

    grunt.registerTask( "style", "Compile the SASS", function(){
        grunt.task.run( [
            "postcss:lint",
            "sass",
            "postcss:build",
            "cssmin"
        ] );
    } );
};
