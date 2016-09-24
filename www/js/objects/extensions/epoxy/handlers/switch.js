var switchHandler = {};

switchHandler.register = function switchRegistration( Backbone ){
    Backbone.Epoxy.binding.addHandler( "switch", {
        "init": function init( $element, value, bindings ){
            var swch = $element.find( "span.fa" );

            swch.removeClass( "fa-toggle-on fa-toggle-off" );
            swch.addClass( value ? "fa-toggle-on" : "fa-toggle-off" );

            $element.on( "click", function switchClickHandler(){
                swch.toggleClass( "fa-toggle-on fa-toggle-off" );
                bindings[ swch.attr( "id" ) ]( swch.hasClass( "fa-toggle-on" ) );
            } );

            this.field = $element;
        },
        "get": function get( $element ){
            var swch = $element.find( "span.fa" );

            return swch.hasClass( "fa-toggle-on" );
        },
        "set": function set( $element, value ){
            var swch = $element.find( "span.fa" );

            swch.removeClass( "fa-toggle-on fa-toggle-off" );
            swch.addClass( value ? "fa-toggle-on" : "fa-toggle-off" );
        },
        "clean": function clean(){
            this.field.off( "click" );
        }
    } );
};

export default switchHandler;
