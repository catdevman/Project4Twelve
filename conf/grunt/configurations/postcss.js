module.exports = function( grunt ){
    "use strict";

    var scssSyntax = require( "postcss-scss" );
    var styleLint = require( "stylelint" );
    var autoprefixer = require( "autoprefixer" );

    return {
        "lint": {
            "options": {
                "writeDest": false,
                "failOnError": true,
                "syntax": scssSyntax,
                "processors": [
                    styleLint
                ]
            },
            "files": [ {
                "expand": true,
                "cwd": "www/scss",
                "src": "**/*.scss"
            } ]
        },
        "build": {
            "options": {
                "processors": [
                    autoprefixer( {
                        "browsers": [ "last 2 versions" ]
                    } )
                ]
            },
            "files": [ {
                "expand": true,
                "cwd": "build/css",
                "src": [ "screen.css" ],
                "dest": "build/css",
                "extDot": "last",
                "ext": ".prefixed"
            } ]
        }
    };
};
