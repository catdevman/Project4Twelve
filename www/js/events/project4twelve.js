/**
 * The event namespace for system-level events
 * @module events/project4twelve
 *
 * @requires interface/ui
 * @requires objects/EventFactory
 */

import Ui from "interface/ui";
import EventFactory from "objects/EventFactory";

var ui = new Ui();
var events = {
    "navigate": function project4TwelveGlobalNavigation( url ){
        var parentWindow = parent.window;

        if( parentWindow === window ){
            // Running as main window
            parentWindow = window;
        }
        else{
            // running in iframe
        }

        parentWindow.location = url;
    },
    "error": function project4TwelveGlobalErrorHandler( callback ){
        callback( ui );
    }
};

export default EventFactory.listen( window.ns, events );
