module.exports = function( grunt ){
    "use strict";

    var _ = require( "underscore" );

    grunt.registerTask( "rename", "Rename some files", function(){
        var buildScss = grunt.file.expandMapping(
            [ "**/*.css" ],
            "build/vendor/",
            {
                "cwd": "build/vendor",
                "ext": ".scss",
                "extDot": "last"
            }
        );

        _( buildScss ).each( function( match ){
            grunt.file.copy( match.src[ 0 ], match.dest );
        } );
    } );
};
