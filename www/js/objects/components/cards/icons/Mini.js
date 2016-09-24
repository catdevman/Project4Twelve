// Libraries
import _ from "underscore";

// Internal Components
import CardComponentView from "component/cards/Mini";
import template from "vw/components/cards/icons/mini.html";

var MiniIconCardComponentView = CardComponentView.extend( {
    "template": _.template( template ),

    "bindings": {
        "h3.name": "text:name",
        ".visual-identity img": "toggle:icon"
    },
    "events": {
        "click .card": function cardClickHandler(){
            this.model.trigger( "click:card", {
                "model": this.model,
                "route": this.model.action
            } );
        }
    },
    "computeds": {
        "useDefaultIcon": {
            "deps": [ "icon" ],
            "get": function useDefaultIconGetter( icon ){
                return !icon;
            }
        }
    },

    "initialize": function initialize( constructionData ){
        this.model = constructionData.model;
        this.modifiers = constructionData.collectionView.cardModifiers || constructionData.modifiers || [];

        this.render();
    }
} );

export default MiniIconCardComponentView;
