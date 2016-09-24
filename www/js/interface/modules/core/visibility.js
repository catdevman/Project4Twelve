import $ from "strap/jquery";
import _ from "underscore";

var UiVisibilityModule = {};
var internalFunctions = {
    "isToggled": function isToggled( container ){
        var parent = $( container ).closest( ".panel, .crate" );
        var body = parent.find( ".inner, .body" ).first();

        return !body.is( ":visible" );
    },
    "toggleToggle": function toggleToggle( toggle ){
        var label = $( toggle )
            .closest( ".toggle" )
            .find( "label" )
            .first();
        var alternate;
        var current;

        function getTexts( toggleLabel ){
            var alt = false;
            var text = false;

            if( label ){
                alt = toggleLabel.data( "alt" );
                text = toggleLabel.text();
            }

            return [ alt, text ];
        }

        $( toggle ).toggleClass( "fa-toggle-on fa-toggle-off" );

        [ alternate, current ] = getTexts( label );

        if( alternate && current ){
            label.data( "alt", current );
            label.text( alternate );
        }
    },
    "toggleCrate": function toggleCrate( element ){
        var crate = $( element ).closest( ".crate" );
        var crateBody = crate.find( ".inner" );

        crateBody.slideToggle();
    },
    "toggleCollapsible": function toggleCollapsible( opts ){
        var parent = $( opts.container ).closest( ".panel, .crate" );
        var indicator = parent.find( ".collapse-state" );
        var body = parent.find( ".body, .inner" ).first();
        var position;

        function getSlideDirection( doOpen ){
            return doOpen ? "slideDown" : "slideUp";
        }

        function toggleIndicator( maybeIndicator ){
            var classesToToggle = {
                "left": "fa-chevron-down fa-chevron-right",
                "right": "fa-chevron-down fa-chevron-left"
            };

            if( maybeIndicator && maybeIndicator.data( "position" ) ){
                position = maybeIndicator.data( "position" );

                maybeIndicator.toggleClass( classesToToggle[ position ] );
            }
        }

        if( !( opts.container ) ){
            throw new TypeError( "There must be a 'container' property to attempt to toggle." );
        }

        _( opts ).defaults( {
            "open": this.isToggled( opts.container ),
            "speed": 400
        } );

        body[ getSlideDirection( opts.open ) ]( opts.speed );
        toggleIndicator( indicator );
    }
};

UiVisibilityModule.toggle = function toggle( type, pass ){
    var methodName = "toggle" + type.uppercaseFirst();

    if( typeof internalFunctions[ methodName ] === "function" ){
        internalFunctions[ methodName ]( pass );
    }
    else{
        throw new TypeError( type + " is not a recognized togglable element" );
    }
};

UiVisibilityModule.isToggled = function isToggled( container ){
    return internalFunctions.isToggled( container );
};

UiVisibilityModule.getToggleState = function getToggleState( toggle ){
    return $( toggle ).hasClass( "fa-toggle-on" );
};

UiVisibilityModule.getCollapsibles = function getCollapsibles(){
    return $( ".collapsible" );
};

UiVisibilityModule.hideElement = function hideGenericElement( element ){
    $( element ).addClass( "hide" );

    return element;
};

UiVisibilityModule.showElement = function showGenericElement( element ){
    $( element ).removeClass( "hide" );

    return element;
};

UiVisibilityModule.toggleElement = function toggleGenericElement( element, to ){
    if( to == undefined ){
        $( element ).toggleClass( "hide" );
    }
    else{
        if( to ){
            UiVisibilityModule.showElement( element );
        }
        else{
            UiVisibilityModule.hideElement( element );
        }
    }

    return element;
};

export default UiVisibilityModule;
