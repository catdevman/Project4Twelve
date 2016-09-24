module.exports = function( grunt ){
    "use strict";

    grunt.registerTask( "docs", "Run documentation generators", function(){
        grunt.task.run( [ "sassdoc", "jsdoc" ] );
    } );
};
