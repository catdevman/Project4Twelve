module.exports = function( grunt ){
    "use strict";

    var _ = require( "underscore" );

    grunt.registerTask( "clean", "Wipe ./build", function(){
        if( grunt.file.isDir( "./build" ) ){
            grunt.file.delete( "./build" );
        }
    } );

    grunt.registerTask( "clean-old-build-files", "Compare Babel files and remove paths that don't exist in source", function(){
        var pathMap = {
            "./www/js/": "./build/convert/",
            "./www/content/": "./build/content/"
        };

        var globs = _( pathMap )
            .chain()
            .values()
            .map(
                ( prefix ) => prefix + "**/*"
            )
            .value();

        var converted = grunt.file.expand( globs );

        _( converted ).each( function( es5File ){
            var items = _( pathMap )
                .chain()
                .pairs()
                .filter(
                    ( pair ) => es5File.indexOf( pair[ 1 ] ) > -1
                )
                .value();

            var convert = items[ 0 ][ 1 ];
            var authored = items[ 0 ][ 0 ];

            var es6File = es5File.replace( convert, authored );

            if( !grunt.file.exists( es6File ) ){
                grunt.log.writeln( es6File + " doesn't exist." );
                grunt.log.error( "Deleting " + es5File );
                grunt.file.delete( es5File );
            }
        } );
    } );
};
