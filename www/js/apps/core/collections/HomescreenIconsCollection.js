import Backbone from "strap/backbone";
import HomescreenIconModel from "core-root/models/homescreen-icon";

var HomescreenIconsCollection = Backbone.Collection.extend( {
    "url": "",
    "model": HomescreenIconModel,
    "sync": function backboneSync(){
        return null;
    },
    "fetch": function backboneFetch(){
        return null;
    },
    "save": function backboneSave(){
        return null;
    }
} );

export default HomescreenIconsCollection;
