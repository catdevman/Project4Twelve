import $ from "strap/jquery";
import _ from "underscore";
import moment from "strap/moment";
import Pikaday from "pikaday";
import Utilities from "utilities";
import trans from "nls/ui";

var UiWidgetsModule = {};

UiWidgetsModule.makeSpinner = function makeSpinner( element, replace = false, pos = undefined ){
    var spinner = $( '<span class="spinner fa fa-spin fa-circle-o-notch"></span>' );
    var $element = $( element );
    var content = $element.html();

    function attachSpinner( attachTo, attach, position ){
        var append = ( position && position > 0 ) || typeof position === "undefined";

        if( append ){
            attachTo.append( "<span>&nbsp;</span>", attach );
        }
        else{
            attachTo.prepend( attach, "<span>&nbsp;</span>" );
        }
    }

    function executor( callback ){
        if( typeof callback === "function" ){
            callback( element );
        }
    }

    function always( wait, callback ){
        if( wait ){
            setTimeout( function alwaysSetTimeoutWaitCallback(){
                $element.html( content );
                executor( callback );
            }, wait );
        }
        else{
            $element.html( content );
            executor( callback );
        }

        return $element;
    }

    if( replace ){
        $element.html( spinner );
    }
    else{
        attachSpinner( $element, spinner, pos );
    }

    return {
        "done": function apiDone( wait, callback ){
            spinner.toggleClass( "fa-spin fa-circle-o-notch fa-check" );

            return always( wait, callback );
        },
        "fail": function apiFail( wait, callback ){
            spinner.toggleClass( "fa-spin fa-circle-o-notch fa-close" );

            return always( wait, callback );
        },
        "restore": function apiRestore( callback ){
            return always( null, callback );
        }
    };
};

UiWidgetsModule.makeSaver = function makeSaver( element, replace ){
    var saver = $( '<div class="saver"><span class="text"></span></div>' );
    var $element = $( element );
    var content = $element.html();
    var spinner = UiWidgetsModule.makeSpinner( saver[ 0 ], false, -1 );

    function executor( callback ){
        if( typeof callback === "function" ){
            callback();
        }
    }

    function makeText( saveDiv, state ){
        var text = "&nbsp;";
        var states = {
            "saved": trans.ui.gadgets.saver.saved,
            "failed": trans.ui.gadgets.saver.failed,
            "pending": trans.ui.gadgets.saver.pending
        };

        if( states[ state ] ){
            text += states[ state ];
        }

        saveDiv.children( "span.text" ).html( text );
    }

    function always( wait, callback ){
        if( wait ){
            setTimeout( function alwaysSetTimeoutWaitCallback(){
                $element.html( content );
                executor( callback );
            }, wait );
        }
        else{
            $element.html( content );
            executor( callback );
        }

        return $element;
    }

    if( !replace ){
        replace = false;
    }

    makeText( saver, "pending" );

    if( replace ){
        $element.html( saver );
    }
    else{
        $element.append( saver );
    }

    return {
        "done": function apiDone( wait, callback ){
            makeText( saver, "saved" );
            spinner.done( wait, callback );

            return always( wait, callback );
        },
        "fail": function apiFail( wait, callback ){
            makeText( saver, "failed" );
            spinner.fail( wait, callback );

            return always( wait, callback );
        }
    };
};

UiWidgetsModule.datepicker = function datepicker( input, options ){
    var settings;

    if( !options ){
        options = {};
    }

    settings = _.defaults( options, {
        "field": input,
        "format": $( input ).data( "format" ) || "YYYY-MM-DD",
        "yearRange": [ moment().year() - 115, moment().year() ]
    } );

    return new Pikaday( settings );
};

UiWidgetsModule.scrollPrompt = function scrollPrompt( element, direction, optionalDestinationElement ){
    var percentVisible = Utilities.client.elementPercentVisible( optionalDestinationElement );
    var $element = this.$( element );
    var offset = $element.offset();
    var height = $element.outerHeight();
    var indicator = this.$( '<div class="scroll-indicator"></div>' );
    var animate = function scrollAnimation( ind, stop, loops, cb ){
        var t = ind.offset().top;

        if( loops > 0 ){
            ind.animate(
                {
                    "top": stop
                },
                650,
                "swing",
                function animationStillHasLoopsCallback(){
                    ind.css( {
                        "top": t
                    } );

                    animate( ind, stop, loops - 1, cb );
                }
            );
        }
        else{
            cb( ind );
        }
    };
    var start;
    var end;
    var clas = "fa-angle-double-down";

    if( direction === "down" ){
        start = offset.top;
        end = offset.top + height - indicator.outerHeight();
    }
    else{
        start = offset.top + height - indicator.outerHeight();
        end = offset.top;
        clas = "fa-angle-double-up";
    }

    if( percentVisible < 35 ){
        indicator.append( '<span class="fa ' + clas + '"></span>' );

        indicator.css( {
            "top": start,
            "left": offset.left - 32
        } );

        $element.before( indicator );

        animate( indicator, end, 4, function scrollAnimationCallback( i ){
            i.remove();
        } );
    }
};

export default UiWidgetsModule;
