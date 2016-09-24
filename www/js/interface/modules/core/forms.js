import $ from "strap/jquery";

var UiFormsModule = {};

UiFormsModule.isSubmitting = function isSubmitting( form, bool ){
    if( bool ){
        $( form ).data( "submitting", bool );
    }
    else{
        return !!$( form ).data( "submitting" );
    }
};

export default UiFormsModule;
