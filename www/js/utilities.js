// Libraries
import _ from "underscore";
import md5 from "blueimp-md5";
import base64 from "base-64";
import utf8 from "utf8";
import $ from "jquery";

import RuleBreaker from "objects/RuleBreaker";

var Utilities = {};

function sniff( things, attachedTo ){
    var i = 0;
    var can = true;

    for( i; i < things.length; i++ ){
        can &= ( things[ i ] in attachedTo );
    }

    return can;
}

function sniffForForm(){
    var neededObjects = [
        "FormData"
    ];

    return sniff( neededObjects, window );
}

function sniffForFileInterface(){
    var neededObjects = [
        "File",
        "FileReader",
        "FileList",
        "Blob"
    ];

    return sniff( neededObjects, window );
}

function sniffForDragAndDrop(){
    var neededEvents = [
        "ondragend",
        "ondragenter",
        "ondragover",
        "ondrop"
    ];

    return sniff( neededEvents, window );
}

Utilities.extend = function extend( parent, child ){
    var childPrototype = child.prototype;
    var key;

    child.prototype = Object.create( parent.prototype );
    for( key in childPrototype ){
        child.prototype[ key ] = childPrototype[ key ];
    }

    child.prototype.constructor = child;

    Object.defineProperty( child.prototype, "constructor", {
        "enumerable": false,
        "value": child
    } );
};

Utilities.promises = {
    "createDeferred": function createDeferred(){
        var def = $.Deferred;

        return def();
    }
};

Utilities.events = {
    "system": function system(){
        return window[ window.ns ].channels[ window.ns ];
    }
};

Utilities.features = {
    "file": sniffForFileInterface(),
    "form": sniffForForm(),
    "dragAndDrop": sniffForDragAndDrop()
};

Utilities.string = {
    "base64": {
        "encode": function encode( text ){
            var bytes = utf8.encode( text );

            return base64.encode( bytes );
        },
        "decode": function decode( string ){
            var bytes = base64.decode( string );

            return utf8.decode( bytes );
        }
    },
    "md5": function md5Wrapper( string ){
        return md5( string );
    },
    "random": function random( length ){
        var rtnStr = "";
        var i = 0;

        function rdmStr(){
            var s = Math.random().toString( 36 ).slice( 2, 3 );

            return s.length === 1 ? s : rdmStr();
        }

        for( i; i < length; i++ ){
            rtnStr += rdmStr();
        }

        return rtnStr;
    }
};

Utilities.url = {
    "makeGet": function makeGetUrl( root, getParams ){
        var url = root;
        var query = $.param( getParams );

        if( query ){
            url += "?" + query;
        }

        return url;
    }
};

Utilities.files = {
    "humanizedSize": function humanizedSize( size ){
        var oneKb = 1000;
        var fixedDecimals = 3;
        var magnitude;
        var result;
        var fixed;
        var suffix;

        // make sure we have a number
        size = typeof size === "number" ? size : 0;

        magnitude = Math.log( size ) / Math.log( oneKb ) | 0;
        result = ( size / Math.pow( oneKb, magnitude ) );
        fixed = result.toFixed( fixedDecimals );
        suffix;

        suffix = magnitude ? ( "kMGTPEZY" )[ magnitude - 1 ] + "B" : "B";

        return {
            "suffix": suffix,
            "magnitude": magnitude,
            "result": result,
            "fixed": fixed,
            "bits": {
                "result": result / 8,
                "fixed": ( result / 8 ).toFixed( fixedDecimals )
            }
        };
    },
    "icon": function icon( input ){
        var guaranteedInput = ( input || "" );
        var slash = guaranteedInput.indexOf( "/" );
        var icons = [ "file", "code", "video", "audio", "zip", "image", "powerpoint", "excel", "word", "pdf", "text" ];
        var extensionMap = {
            "jpg": "image",
            "jpeg": "image",
            "pdf": "pdf"
        };
        var typeMap = {
            "image/jpeg": "image",
            "application/pdf": "pdf"
        };
        var ico;

        function getIcon( name ){
            var iconClass = "fa-file-";

            if( _( icons ).indexOf( name ) > -1 ){
                iconClass += name + "-";
            }

            return iconClass + "o";
        }

        function getIconByExtension( ext ){
            var extClass = getIcon();

            if( _( extensionMap ).has( ext ) ){
                extClass = getIcon( extensionMap[ ext ] );
            }

            return extClass;
        }

        function getIconByType( type ){
            var typeClass = getIcon();

            if( _( typeMap ).has( type ) ){
                typeClass = getIcon( typeMap[ type ] );
            }

            return typeClass;
        }

        if( slash > -1 ){
            ico = getIconByType( guaranteedInput );
        }
        else{
            ico = getIconByExtension( guaranteedInput );
        }

        return ico;
    }
};

Utilities.console = {
    "log": function log( message ){
        RuleBreaker.console.log( message );
    },
    "warn": function warn( message ){
        RuleBreaker.console.warn( message );
    },
    "error": function error( message ){
        RuleBreaker.console.error( message );
    }
};

Utilities.client = {
    "setTitle": function setTitle( name ){
        if( window[ window.ns ].config ){
            name = name + " :: " + ( window[ window.ns ].config.subscription.friendlyName || window[ window.ns ].config.subscription.district.name );
        }

        document.title = name + " :: Five-Star Pivot";
    },
    "getVisibleBoundingBox": function getVisibleBoundingBox(){
        var wHeight = document.body.offsetHeight;
        var wWidth = document.body.offsetWidth;
        var scrollTop = window.scrollX;
        var scrollLeft = window.scrollY;

        return {
            "x": [ scrollLeft, wWidth - -scrollLeft ],
            "y": [ scrollTop, wHeight - -scrollTop ]
        };
    },
    "elementPercentVisible": function elementPercentVisible( element ){
        var bounds = Utilities.client.getVisibleBoundingBox();

        var height = element.offsetHeight;
        var top = element.offsetTop;
        var bottom = ( top + height );

        var topIsOnScreen = bounds.y[ 0 ] <= top;
        var bottomIsOnScreen = bounds.y[ 1 ] >= bottom;
        var topIsBelowScreen = bounds.y[ 1 ] < top;
        var bottomIsAboveScreen = bounds.y[ 0 ] > bottom;

        var visiblePercent;
        var isMax;
        var isMin;

        function isEntirelyOnscreen(){
            return ( topIsOnScreen && bottomIsOnScreen );
        }

        function isCoveringScreen(){
            return ( !topIsOnScreen && !bottomIsOnScreen );
        }

        function isOffScreen(){
            return topIsBelowScreen || bottomIsAboveScreen;
        }

        function fractionalPercentVisible(){
            if( topIsOnScreen ){
                visiblePercent = ( bounds.y[ 1 ] - top ) / height;
            }
            else{
                visiblePercent = ( bottom - bounds.y[ 0 ] ) / height;
            }

            visiblePercent = Math.floor( visiblePercent * 100 );
        }

        function percentVisible( atMin, atMax ){
            var percent;

            if( atMax ){
                percent = 100;
            }
            else if( atMin ){
                percent = 0;
            }
            else{
                percent = fractionalPercentVisible();
            }

            return percent;
        }

        isMax = ( isEntirelyOnscreen() || isCoveringScreen() );
        isMin = isOffScreen();

        visiblePercent = percentVisible( isMin, isMax );

        return visiblePercent;
    }
};

Utilities.application = {
    "flattenJson": function flattenJson( json, treatEmbeddedAsTransparent ){
        var newJson = json instanceof Array ? [] : {};
        var val;
        var newVal;

        function flattenJsonInternal( wrappedVal, originalValue, embeddedIsTransparent ){
            var response;

            if( wrappedVal.isArray() || wrappedVal.isObject() ){
                response = Utilities.application.flattenJson( originalValue, embeddedIsTransparent );
            }
            else{
                response = originalValue;
            }

            return response;
        }

        if( typeof treatEmbeddedAsTransparent === "undefined" ){
            treatEmbeddedAsTransparent = true;
        }

        _( json ).each( function flattenJsonIterator( value, key ){
            val = _( val );

            newVal = flattenJsonInternal( val, value, treatEmbeddedAsTransparent );

            if( treatEmbeddedAsTransparent && key === "_embedded" ){
                _( newJson ).extend( newVal );
            }
            else{
                newJson[ key ] = newVal;
            }
        } );

        return newJson;
    }
};

export default Utilities;
