// Libraries
import Backbone from "strap/backbone";

var HomescreenIconModel = Backbone.Epoxy.Model.extend( {
    "defaults": {
        "id": 0,
        "title": "",
        "type": "link",
        "icon": "",
        "action": ""
    },
    "getId": function getId(){
        return this.get( "id" );
    },
    "getTitle": function getName(){
        return this.get( "name" );
    }
} );

export default HomescreenIconModel;
