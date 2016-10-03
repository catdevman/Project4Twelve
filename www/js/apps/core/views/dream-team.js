// External Libraries
import _ from "underscore";
import Backbone from "strap/backbone";

// Templates & Translations
import tmpl from "vw/core/dream-team.html";

var CoreHomeView;

CoreHomeView = Backbone.Epoxy.View.extend( {
    "el": ".app",
    "template": _.template( tmpl ),

    "initialize": function initialize(){
        this.render();
    },
    "render": function render( ){
        this.$el.html( this.template() );

        return this;
    }
} );

export default CoreHomeView;
