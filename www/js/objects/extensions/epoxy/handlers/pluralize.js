import _ from "underscore";
import $ from "strap/jquery";

var pluralizeHandler = {};

function normalizeSize( prop ){
    var wrappedProp = _( prop );
    var state = {
        "empty": wrappedProp.isEmpty(),
        "nan": wrappedProp.isNaN(),
        "undefined": wrappedProp.isUndefined(),
        "null": wrappedProp.isNull(),
        "array": wrappedProp.isArray(),
        "object": wrappedProp.isObject(),
        "number": wrappedProp.isNumber(),
        "function": wrappedProp.isFunction(),
        "string": wrappedProp.isString(),
        "element": wrappedProp.isElement(),
        "regex": wrappedProp.isRegExp()
    };
    var lengths = {
        "isBroken": 0,
        "isOtherTruthy": 1,
        "hasLength": prop.length,
        "isIterable": wrappedProp.size()
    };
    var functions = {
        "isBroken": function isBroken( status ){
            return ( !status.number && status.empty ) || status.undefined || status.null;
        },
        "isIterable": function isIterable( status ){
            return status.array || status.object;
        },
        "hasLength": function hasLength( status ){
            return status.function || status.string;
        },
        "isOtherTruthy": function isOtherTruthy( status ){
            return status.regex || status.element;
        }
    };
    var len = prop;

    _( functions ).each( ( test, name ) => {
        if( test( state ) ){
            len = lengths[ name ];
        }
    } );

    return len;
}

function checkSources( sources, count ){
    var matchedCounts = _( sources.counts ).filter(
        ( source ) => checkForCount( source, count )
    );
    var matchedRanges = _( sources.ranges ).filter(
        ( source ) => checkForRange( source, count )
    );

    return _.union( matchedCounts, matchedRanges );
}

function checkForCount( source, count ){
    return $( source ).attr( "count" ) == count;
}

function checkForRange( source, count ){
    var $source = $( source );
    var min = parseInt( $source.attr( "min" ), 10 ) || 1;
    var max = parseInt( $source.attr( "max" ), 10 );
    var inRange = false;

    if( max ){
        inRange = count >= min && count <= max;
    }
    else{
        inRange = count >= min;
    }

    return inRange;
}

pluralizeHandler.register = function pluralizeHandlerRegisterer( Backbone ){
    Backbone.Epoxy.binding.addHandler( "pluralize", {
        "init": function init( $element ){
            var parts = $element.find( "pluralize" ).hide();
            var counts = parts.map(
                ( idx, part ) => {
                    var is;

                    if( $( part ).is( "[count]" ) ){
                        is = part;
                    }

                    return is;
                }
            ).get();
            var ranges = parts.map(
                ( idx, part ) => {
                    var is;

                    if( $( part ).is( "[min],[max]" ) ){
                        is = part;
                    }

                    return is;
                }
            ).get();

            this.sources = {
                "counts": counts,
                "ranges": ranges
            };
        },
        "set": function set( $element, value ){
            var sources = $element.find( "pluralize" );
            var matches = checkSources( this.sources, normalizeSize( value ) );
            var output = _( matches ).reduce(
                ( memo, match ) => memo + $( match ).html(),
                ""
            );
            var pluralized = $element.find( "pluralized" );

            if( pluralized.length === 0 ){
                pluralized = $( "<pluralized></pluralized>" );
            }

            pluralized.html( output );
            sources.first().before( pluralized );
        }
    } );
};

export default pluralizeHandler;
