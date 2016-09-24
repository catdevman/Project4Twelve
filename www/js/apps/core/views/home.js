// External Libraries
import _ from "underscore";
import Backbone from "strap/backbone";

// Templates & Translations
import tmpl from "vw/core/home.html";

// Component Views
import CardGrid from "component/CardGrid";
import HomeScreenIconView from "component/cards/icons/Mini";
// Data
import homescreenIcons from "data/homescreen-icons.json";

var CoreHomeView;


CoreHomeView = Backbone.Epoxy.View.extend( {
    "el": ".app",
    "template": _.template( tmpl ),

    "initialize": function initialize(){
        var cards = new CardGrid( {
            "collection": new HomeScreenIcon( homescreenIcons ),
            "card": HomeScreenIconView,
            "cardModifiers": [ "hasCheckbox" ]
        } );

        this.render();
    },
    "render": function render(){
        this.$el.html( this.template() );

        return this;
    }
} );

export default CoreHomeView;
