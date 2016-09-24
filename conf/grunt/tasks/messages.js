module.exports = function messagesGruntTask( grunt ){
    "use strict";

    grunt.registerMultiTask( "message", "Display messages in the command line", function messenger(){
        if( this.target == "default" ){
            grunt.log
                .write( "\n" )
                .oklns( grunt.log.wordlist( [ "==========" ], { "color": "green" } ) )
                .write( "You can use " )
                .write( grunt.log.wordlist( [ "`grunt docs`" ] ) )
                .writeln( " to generate documentation." )
                .oklns( grunt.log.wordlist( [ "==========" ], { "color": "green" } ) );
        }
    } );
};
