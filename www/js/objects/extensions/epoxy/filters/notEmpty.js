import _ from "underscore";

var notEmptyFilter = {};

notEmptyFilter.register = function notEmptyRegistration( Backbone ){
    Backbone.Epoxy.binding.addFilter( "notEmpty", function notEmptyBindingFilter( collection ){
        return !_( collection ).isEmpty();
    } );
};

export default notEmptyFilter;
