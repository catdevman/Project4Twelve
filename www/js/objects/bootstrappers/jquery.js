import jQuery from "jquery";
import _ from "underscore";
import $errors from "strap/jquery/errors";
import RuleBreaker from "objects/RuleBreaker";
import "qtip2";

var $ = jQuery;

function handleErrors( $jQuery, knownErrors ){
    $jQuery.ajaxPrefilter( function jqueryAjaxPrefilter( options ){
        var requestError = options.error;
        var superError = function superErrorHandler( xhr, status, error ){
            var project4TwelveFriendlyErrorName; // It's probably just the actual HTTP spec name, FWIW

            if( _( knownErrors.numbers ).indexOf( xhr.status ) > -1 ){
                project4TwelveFriendlyErrorName = knownErrors.name( xhr.status );

                knownErrors.handle( xhr.status, {
                    "xhr": xhr,
                    "status": status,
                    "message": error
                } );

                RuleBreaker.console.error( project4TwelveFriendlyErrorName + " -- " + error );
            }

            if( typeof requestError == "function" ){
                requestError( xhr, status, error );
            }
        };

        options.error = superError;
    } );

    return $jQuery;
}

$ = handleErrors( $, $errors );

export default $;
