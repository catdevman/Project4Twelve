// Libraries
import Backbone from "strap/backbone";
import _ from "underscore";

// Templates, Translations, and Views
import DefaultCardComponentView from "component/cards/Mini";
import template from "vw/core/components/grids/cards.html";

// Events
import EventManager from "objects/EventManager";

var CardGridView = Backbone.Epoxy.View.extend( {
    "template": _.template( template ),

    "bindings": {
        ".cards": 'collection:$collection,itemView:"card"'
    },

    "initialize": function initialize( initData ){
        var options = _( initData ).defaults( {
            "card": DefaultCardComponentView
        } );

        this.cardModifiers = options.cardModifiers;

        this.children = [];

        this.vent = EventManager.listen( "CardGrid", {} );

        this.card = options.card;

        this.viewModel = new Backbone.Epoxy.Model( {
            "selectedCards": {}
        } );

        this.listenTo(
            this.collection,
            "click:card",
            function cardClickEventListener( cardData ){
                this.vent.trigger( "cards:click:card", {
                    "id": cardData.model.id,
                    "route": cardData.route
                } );
            }
        );

        if( _( this.cardModifiers ).contains( "hasCheckbox" ) ){
            this.respondToCheckbox();
        }

        this.render();
    },
    "render": function render(){
        var context = this;

        this.$el.append( this.template() );

        this.collection.fetch( {
            "success": function handleSuccess( collection ){
                context.respondToCollection( collection );
            }
        } );

        return this;
    },
    "respondToCollection": function respondToCollection( collection ){
        if( collection.length === 0 ){
            this.vent.trigger( "warning:emptyData" );
        }
    },
    "respondToCheckbox": function respondToCheckbox(){
        this.listenTo(
            this.collection,
            "change:isSelected",
            function selectedCardsChanged( model, viewModel ){
                this.viewModel.modifyObject(
                    "selectedCards",
                    model.get( "id" ),
                    viewModel.get( "isSelected" ) ? true : undefined
                );

                this.vent.trigger( "cards:change:selected" );
            }
        );
    },
    "appendToTarget": function appendToTarget( $target ){
        this.$el.appendTo( $target );
    },
    "remove": function remove(){
        _( this.children ).each(
            ( child ) => child.remove()
        );

        Backbone.View.prototype.remove.call( this );
    },
    "getSelected": function getSelectedCards(){
        return this.viewModel.get( "selectedCards" );
    }
} );

export default CardGridView;
