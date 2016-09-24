// Libraries
import Backbone from "strap/backbone";

var HomescreenIconModel = Backbone.Model.extend( {
    "getId": function getId(){
        return this.get( "id" );
    },
    "getTitle": function getTitle(){
        return this.get( "title" );
    },
    "getIcon": function getIcon(){
        return this.get( "icon" );
    },
    "getAction": function getAction(){
        return this.get( "action" );
    },
    "getType": function getType(){
        return this.get( "type" );
    }
} );

export default HomescreenIconModel;
