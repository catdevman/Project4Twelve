module.exports = function( grunt ){
    "use strict";

    var build = grunt.template.today( "yyyymmdd.HHMMss.l" );

    return {
        "app": grunt.file.readJSON( "./package.json" ),
        "build": build,
        "banner": `window.ns="project4twelve";
window[ window.ns + "-prepare" ] = {
    "cleanSlate": function(){
        window[ window.ns ] = {
            "v": "${build}",
            "layouts": {},
            "channels": {},
            "storage": {},
            "routes": {}
        };
    },
    "hasState": function(){
        return window[ window.ns ] instanceof Object;
    },
    "stateIsOld": function( existingV, newV ){
        var existingVParts = existingV.split( "." );
        var newVParts = newV.split( "." );
        var isOld = false;

        existingVParts.forEach( function( part, i ){
            isOld = isOld || ( part < newVParts[ i ] );
        } );

        return isOld;
    },
    "prepare": function(){
        if( this.hasState() && this.stateIsOld( window[ window.ns ].v, "${build}" ) ){
            this.cleanSlate();
        }
        else if( !this.hasState() ){
            this.cleanSlate();
        }

        setTimeout( function(){
            delete window[ window.ns + "-prepare" ];
        }, 0 );
    }
};

window[ window.ns + "-prepare" ].prepare();
`
    };
};
