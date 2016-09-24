import _ from "underscore";
import $ from "strap/jquery";

var buttonsHandler = {};

function valueGetter( $button ){
    return $button.attr( "value" ) || $button.find( ".text" ).text() || $button.text();
}

function getButtonForValue( $buttons, value ){
    return $buttons.filter( function buttonsFilterer( index, button ){
        var $button = $( button );
        var matches = false;

        matches = $button.attr( "value" ) === value;
        matches = matches || $button.find( ".text" ).text() === value;
        matches = matches || $button.text() === value;

        return matches;
    } ).first();
}

function setDom( value, behavior, buttons ){
    if( value && !_( value ).isEmpty() ){
        if( behavior === "radio" ){
            getButtonForValue( buttons, value ).addClass( "active" );
        }
        else{
            _( value ).each( function buttonSelector( v ){
                var $b = getButtonForValue( buttons, v );

                if( $b ){
                    $b.addClass( "active" );
                }
            } );
        }
    }
}

buttonsHandler.register = function buttonRegistration( Backbone ){
    Backbone.Epoxy.binding.addHandler( "buttons", {
        "init": function init( $element, value, bindings ){
            var buttons = $element.find( "button" );
            var behavior = $element.data( "behave" ) || "radio";
            var property = $element.attr( "id" );

            setDom( value, behavior, buttons );

            buttons.on( "click", function buttonClickHandler( e ){
                var $button = $( this );
                var buttonValue = [];

                if( behavior === "radio" ){
                    buttons.removeClass( "active" );
                    buttonValue = valueGetter( $button );
                }
                else{
                    buttons.each( function buttonInitValueIterator( button ){
                        var $tempButton = $( button );

                        buttonValue.push( valueGetter( $tempButton ) );
                    } );
                }

                $button.addClass( "active" );

                bindings[ property ]( buttonValue );

                e.preventDefault();

                return false;
            } );

            this.buttons = buttons;
        },
        "get": function get( $element ){
            var $buttons = $element.find( "button.active" );
            var behavior = $element.data( "behave" ) || "radio";
            var value = [];

            if( behavior === "radio" ){
                value = valueGetter( $buttons.first() );
            }
            else{
                $buttons.each( function buttonGetValueIterator( button ){
                    var $tempButton = $( button );

                    value.push( valueGetter( $tempButton ) );
                } );
            }

            return value;
        },
        "set": function set( $element, value ){
            var $buttons = $element.find( "button" );
            var behavior = $element.data( "behave" ) || "radio";

            setDom( value, behavior, $buttons );
        },
        "clean": function clean(){
            this.buttons.off( "click" );
        }
    } );
};

export default buttonsHandler;
