import Backbone from "strap/backbone";
import HomescreenIconMode from "core-root/models/homescreen-icon";

var HomescreenIconsCollection = Backbone.Collection.extend( {
    "model": HomescreenIconMode
} );

export default HomescreenIconsCollection;
