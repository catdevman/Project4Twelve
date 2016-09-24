import _ from "underscore";

function I18n( config = { "locale": "en" } ){
    function resolveLocale(){
        var resolved = typeof navigator === "undefined" ? false : resolveLanguages( navigator );

        function resolveLanguages( navigator ){
            return ( navigator.languages && navigator.languages[ 0 ] ) || navigator.language || navigator.userLanguage;
        }

        return resolved;
    }

    this.locale = resolveLocale();
    this.config = config;
}

I18n.prototype.loadDefinitions = function loadDefinitions( definition ){
    this.translations = definition;
};

I18n.prototype.localize = function localize(){
    var response = {};
    var emergencyFallback = this.config.locale;
    var tag = this.locale || emergencyFallback;
    var parts = tag.split( "-" );
    var tags;

    function generateIncreasinglySpecificLanguageTags( partsParam ){
        var thisTags = [];
        var i = 0;
        var ending;

        for( i; i < partsParam.length; i++ ){
            ending = undefined;

            if( partsParam.length - 1 > i ){
                ending = i - -1;
            }

            thisTags.push( partsParam.slice( 0, ending ).join( "-" ) );
        }

        return thisTags;
    }

    tags = generateIncreasinglySpecificLanguageTags( parts );

    _( this.translations ).each( function i18nTranslationIterator( def, name ){
        response[ name ] = def[ emergencyFallback ];

        _( tags ).each( function i18nTagIterator( specificTag ){
            if( _( def ).has( specificTag ) ){
                response[ name ] = def[ specificTag ];
            }
        } );
    } );

    return response;
};

export default I18n;
