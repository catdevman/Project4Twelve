import _ from "underscore";

var countFilter = {};

function inRange( val, min, max ){
    var response = false;

    if( !max ){
        response = val >= min;
    }
    else{
        response = val >= min && val <= max;
    }

    return response;
}

function resolveSettings( param, defaults ){
    if( parseInt( param, 10 ) == param ){
        param = { "min": parseInt( param, 10 ), "max": parseInt( param, 10 ) };
    }

    param = _( param ).defaults( defaults );

    return param;
}

function reduce( prop, settings ){
    var fallsWithinRange = false;

    if( _( prop ).isArray() || _( prop ).isObject() ){
        fallsWithinRange = inRange( _( prop ).size(), settings.min, settings.max );
    }
    else{
        fallsWithinRange = !!prop;
    }

    return fallsWithinRange;
}

countFilter.register = function countFilterRegisterer( Backbone ){
    Backbone.Epoxy.binding.addFilter( "count", function countFilterHandler( prop, settings = { "min": 1 } ){
        var countOkay = false;

        settings = resolveSettings( settings, { "min": 1 } );
        countOkay = reduce( prop, settings );

        return countOkay;
    } );
};

export default countFilter;
