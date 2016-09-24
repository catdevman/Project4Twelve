// Libraries
import Backbone from "strap/backbone";
import _ from "underscore";

// Internal Components
import template from "vw/components/cards/mini.html";

var CardComponentView = Backbone.Epoxy.View.extend( {
    "className": "flex-col",
    "template": _.template( template ),

    "bindings": {
        ".select": "checked:isSelected"
    },
    "events": {
        "click .select": function clickSelect( evt ){
            evt.stopPropagation();
        }
    },

    "computeds": {},

    "initialize": function initialize( constructionData ){
        this.model = constructionData.model;

        this.viewModel = new Backbone.Epoxy.Model( {
            "isSelected": false
        } );

        this.modifiers = constructionData.collectionView.cardModifiers || constructionData.modifiers || [];
        this.initializeCheckboxes();

        this.render();
    },
    "render": function render(){
        var modelData;

        function capitalizeFirstLetter( string ){
            return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
        }

        modelData = _.chain( this.model.attributes )
                    .clone()
                    .mapObject( ( value, key ) => {
                        var newValue = value;

                        if( key.match( /Name/ ) ){
                            newValue = capitalizeFirstLetter( value );
                        }

                        return newValue;
                    } )
                    .value();

        this.$el.html( this.template( modelData ) );

        this.$el.find( ".mini.card" ).addClass( this.modifiers.join( " " ) );

        return this;
    },
    "initializeCheckboxes": function initializeCheckboxes(){
        if( this.modifiers.indexOf( "hasCheckbox" ) !== -1 ){
            this.listenTo( this.viewModel, "change:isSelected", function changeIsSelected(){
                this.model.trigger( "change:isSelected", this.model, this.viewModel );
            } );
        }
    }
} );

export default CardComponentView;
