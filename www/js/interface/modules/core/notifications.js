// Libraries
import _ from "underscore";
import $ from "strap/jquery";
import "noty";
// Templates and Translations
import trans from "nls/ui";

var UiNotificationsModule = {};

UiNotificationsModule.highlight = function highlight( node, optionalFlashOption = {} ){
    var doesFlash = false;
    var $node = $( node );
    var flashSettings = {
        "speed": 500,
        "iterations": 4
    };
    var exports = {
        "clear": function clearHighlight(){
            $node.removeClass( "highlight" );
            if( doesFlash ){
                $node.removeClass( "transition" );
            }
        }
    };
    var flasher = function flashHighlight( flashNode, flashes, options, controls ){
        var doneIterations = 0;

        if( flashes ){
            flashNode.addClass( "transition" );

            setTimeout( function flashTimeoutCallback(){
                flashNode.toggleClass( "highlight" );
                doneIterations++;

                if( doneIterations < options.iterations ){
                    flasher();
                }
                else{
                    controls.clear();
                }
            }, options.speed );
        }
    };

    if( !_( optionalFlashOption ).isEmpty() ){
        doesFlash = true;

        if( typeof optionalFlashOption !== "object" ){
            optionalFlashOption = {};
        }
    }

    _.defaults( optionalFlashOption, flashSettings );

    $node.addClass( "highlight" );
    flasher( $node, doesFlash, optionalFlashOption, exports );

    return exports;
};

UiNotificationsModule.createNotice = function createNotice( type, content ){
    var notice = $( "<div></div>" );

    notice
        .addClass( "notice" )
        .addClass( type );

    notice.html( content );

    return notice;
};

UiNotificationsModule.notify = function notify( options ){
    var settings;

    if( !options ){
        options = {};
    }

    settings = _.defaults( options, {
        "theme": "relax",
        "layout": "topRight",
        "text": "message",
        "type": "success"
    } );

    /* global noty */
    return noty( settings );
};

UiNotificationsModule.confirmDelete = function confirmDelete( options = {} ){
    var cancel;
    var confirm;
    var settings;

    options = _( options ).defaults( {
        "confirm": function defaultConfirmHandler(){},
        "cancelButton": trans.ui.notices.delete.buttons.cancel,
        "confirmButton": trans.ui.notices.delete.buttons.confirm
    } );

    cancel = options.cancelButton;
    confirm = options.confirmButton;
    settings = _.defaults( options, {
        "layout": "center",
        "type": "error",
        "modal": true,
        "text": trans.ui.notices.delete.text,
        "buttons": [
            {
                "addClass": "standard",
                "text": cancel,
                "onClick": function deleteCancelHandler( $noty ){
                    $noty.close();
                }
            },
            {
                "addClass": "error",
                "text": confirm,
                "onClick": function deleteConfirmHandler( $noty ){
                    $noty.close();
                    options.confirm();
                }
            }
        ],
        "animation": {
            "open": { "height": "toggle" },
            "close": { "height": "toggle" },
            "easing": "swing",
            "speed": 100
        }
    } );

    UiNotificationsModule.notify( settings );
};

UiNotificationsModule.tooltip = function tooltip( options ){
    var passedElement = options.element;
    var isjQuery = passedElement instanceof $;
    var isString = typeof passedElement === "string";
    var isHtml = passedElement instanceof HTMLElement;
    var isWrappable = isString || isHtml;
    var $node;

    function getNode( pass, is$, canWrap ){
        var wrapped;

        if( is$ ){
            wrapped = pass;
        }
        else if( canWrap ){
            wrapped = $( pass );
        }

        return wrapped;
    }

    delete options.element;
    $node = getNode( passedElement, isjQuery, isWrappable );

    // TODO - figure out a way to deep merge / `deep defaults` a set of sane, sitewide
    //          defaults with what's passed in

    if( $node && $node.length !== 0 ){
        $node.qtip( options );
    }
};

export default UiNotificationsModule;
