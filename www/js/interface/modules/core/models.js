import $ from "strap/jquery";
import _ from "underscore";
import trans from "nls/ui";

var UiModelsModule = {};

UiModelsModule.getSetter = function getSetter( field ){
    return "set" + $( field ).attr( "id" ).uppercaseFirst();
};

UiModelsModule.getGetter = function getGetter( field ){
    return "get" + $( field ).attr( "id" ).uppercaseFirst();
};

UiModelsModule.markRequiredFields = function markRequiredFields( rootElement, model ){
    var self = this;
    var reqd = _( model.validation )
        .omit( function validationFieldsOmitter( property ){
            var isBasic = !( property instanceof Array );
            var hasReqd = false;
            var shouldOmit = true;

            if( isBasic ){
                shouldOmit = !( _( property ).has( "required" ) && property.required === true );
            }
            else{
                hasReqd = _( property ).find( function requiredPropertyFinder( validator ){
                    return _( validator ).has( "required" );
                } );

                if( hasReqd ){
                    shouldOmit = !hasReqd.required;
                }
            }

            return shouldOmit;
        } );
    var markInputRequired = function markInputRequired( input, msg ){
        var req = self.$( '<span class="required-indicator"></span>' );
        var label = self.$( self.getLabel( input ) );
        var field = self.$( input ).closest( ".field" );

        req.html( "*" )
            .attr( "title", msg || trans.ui.gadgets.required.tip );

        label.append( req );

        req.qtip( {
            "position": {
                "my": "bottom center",
                "at": "top center",
                "adjust": {
                    "y": -1
                }
            },
            "style": {
                "classes": "qtip-light qtip-shadow qtip-rounded"
            }
        } );

        field.addClass( "required" );
    };

    _( reqd ).each( function requiredFieldIterator( validation, id ){
        var msg = validation.msg || _( validation ).findWhere( { "required": true } ).msg;

        markInputRequired( self.getInputById( rootElement, id ), msg );
    } );
};

UiModelsModule.getFieldValidity = function getFieldValidity( field, model ){
    var $field = $( field );

    return model.preValidate( $field.attr( "id" ), $field.val() );
};

export default UiModelsModule;
