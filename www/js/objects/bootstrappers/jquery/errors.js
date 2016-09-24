import _ from "underscore";
import translations from "nls/ui";
import Utilities from "utilities";

var errors;
var handler;
var trans = translations.ui;

function triggerProject4TweleveError( callback ){
    Utilities.events.system().trigger( "error", callback );
}

errors = {
    "501": {
        "name": "Not Implemented",
        "handlers": [
            function default501Handler( xhr, status, message ){
                triggerProject4TweleveError( function project4TweleveErrorCallback( ui ){
                    ui.notify( {
                        "type": "error",
                        "layout": "top",
                        "text": _.template( trans.notices.errorHandlers[ "501" ] )( {
                            "code": 501,
                            "message": Utilities.string.base64.encode( message )
                        } ),
                        "buttons": [
                            {
                                "addClass": "button error",
                                "text": trans.notices.buttons.errorConfirm,
                                "onClick": function project4TweleveErrorClickEventHandler( $noty ){
                                    $noty.close();
                                }
                            }
                        ]
                    } );
                } );
            }
        ]
    }
};

handler = {
    "numbers": _.chain( errors )
        .keys()
        .map( function keyToNumberMapper( k ){
            return Number( k );
        } )
        .value(),
    "handle": function handleAjaxError( statusCode, context ){
        _( errors[ statusCode ].handlers ).each( function errorCodeHandlersIterator( handle ){
            return handle( context.xhr, context.status, context.message );
        } );
    },
    "name": function getNameOfStatusCode( statusCode ){
        return errors[ statusCode ].name;
    }
};

export default handler;
