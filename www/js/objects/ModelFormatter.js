import _ from "underscore";

var ModelFormatter = {};

ModelFormatter.format = function format( model, map ){
    var json = model.toJSON();

    _( map ).each( function modelFormatterMapper( apiKey, modelKey ){
        var key = modelKey;
        var del = true;

        if( modelKey instanceof Array ){
            key = modelKey[ 0 ];
            del = modelKey[ 1 ];
        }

        json[ apiKey ] = json[ key ];

        if( del ){
            delete json[ key ];
        }
    } );

    return json;
};

ModelFormatter.unformat = function unformat( json, map ){
    var newJson = {};
    var flatMap = {};

    _( map ).map( function modelUnformatterMapper( local, api ){
        if( local instanceof Array ){
            local = local[ 0 ];
        }

        flatMap[ api ] = local;
    } );

    map = _( flatMap ).invert();

    _( json ).each( function modelUnformatterJsonIterator( apiVal, apiKey ){
        var key;

        if( _( map ).has( apiKey ) ){
            key = map[ apiKey ];

            newJson[ key ] = apiVal;
        }
        else{
            newJson[ apiKey ] = apiVal;
        }
    } );

    return newJson;
};

export default ModelFormatter;
