import $ from "strap/jquery";

var UiInputsModule = {};

UiInputsModule.getInput = function getInput( parent, type ){
    var types = {
        "toggle": {
            "closest": ".toggle",
            "input": ".fa-toggle-on, .fa-toggle-off"
        },
        "text": {
            "closest": "div",
            "input": "textarea"
        },
        "input": {
            "closest": "div",
            "input": "input"
        },
        "select": {
            "closest": "div",
            "input": "select"
        }
    };

    function parseType( parentNode, inputType, knownTypes ){
        var input = "";
        var unwrappedType;

        if( knownTypes[ inputType ] ){
            unwrappedType = knownTypes[ inputType ];
            input = $( parentNode )
                .closest( unwrappedType.closest )
                .find( unwrappedType.input )[ 0 ];
        }

        return input;
    }

    return parseType( parent, type, types );
};

UiInputsModule.getInputById = function getInputById( rootElement, id ){
    var input = $( rootElement ).find( "#" + id );

    if( input.length > 0 ){
        return input[ 0 ];
    }
};

UiInputsModule.getLabel = function getLabel( field ){
    return $( field ).closest( ".field,.toggle" ).find( "label" )[ 0 ];
};

UiInputsModule.selectButton = function selectButton( button ){
    var $button = $( button );
    var group = $button.closest( ".select-bar" );
    var behavior = group.data( "behave" );

    if( behavior === "radio" ){
        group.find( "button" ).removeClass( "active" );
    }

    $button.toggleClass( "active" );

    return $button;
};

UiInputsModule.getButtonSelection = function getButtonSelection( buttonOrGroup ){
    var group = $( buttonOrGroup ).closest( ".select-bar" );
    var behavior = group.data( "behave" );
    var selections = group.find( "button.active" );
    var result;

    if( behavior === "radio" ){
        result = selections.first();
    }
    else{
        result = selections;
    }

    return result;
};

UiInputsModule.getButtonValue = function getButtonValue( button ){
    return $( button ).data( "value" );
};

UiInputsModule.getAllButtonValues = function getAllButtonValues( buttonOrGroup ){
    var group = $( buttonOrGroup ).closest( ".select-bar" );
    var values = [];

    group.find( "button" ).each( function buttonGroupButtonIterator(){
        values.push( $( this ).data( "value" ) );
    } );

    return values;
};

UiInputsModule.toggleCheck = function toggleCheck( clickedElement ){
    var $element = $( clickedElement );
    var span = $element.find( "span.fa-square-o, span.fa-check-square-o" );

    $( span ).toggleClass( "fa-square-o fa-check-square-o" );
};

UiInputsModule.toggleValidationError = function toggleValidationError( field, bool = false, message = "There is a problem with this field" ){
    var $el = $( field );

    if( $el.is( "form" ) ){
        this.toggleFormValidation( field, bool, message );
    }
    else if( $el.is( "input,select,textarea" ) ){
        this.toggleInputValidation( field, bool, message );
    }
};

UiInputsModule.toggleFormValidation = function toggleFormValidation( form, bool = false, message = "There is a problem with this field" ){
    var $form = $( form );
    var $help = $form.find( "span.help.error" );

    if( $help.length === 0 ){
        $help = $( '<span class="help error"></span>' );
    }

    $help.html( message );

    if( bool ){
        $form.addClass( "error" );
        $form.prepend( $help );
    }
    else{
        $form.removeClass( "error" );
        $help.remove();
    }
};

UiInputsModule.toggleInputValidation = function toggleInputValidation( field, bool = false, message = "There is a problem with this field" ){
    var $el = $( field );
    var $container = $el.closest( ".field" );
    var $help = $container.find( "span.help.error" );

    if( $help.length === 0 ){
        $help = $( '<span class="help error"></span>' );
    }

    $help.html( message );

    if( bool ){
        $container.addClass( "error" );
        $el.after( $help );
    }
    else{
        $container.removeClass( "error" );
        $help.remove();
    }
};

export default UiInputsModule;
