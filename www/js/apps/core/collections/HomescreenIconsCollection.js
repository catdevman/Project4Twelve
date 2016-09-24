import Backbone from "strap/backbone";
import HomescreenIconModel from "core-root/models/homescreen-icon";

var HomescreenIconsCollection = Backbone.Collection.extend( {
    "model": HomescreenIconModel
} );

export default HomescreenIconsCollection;
