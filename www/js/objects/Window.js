export default {
    "beforeUnload": function beforeUnload( callback ){
        "use strict";

        window.addEventListener( "beforeunload", callback );
    },
    "navigate": function navigate( location ){
        history.pushState( {}, "", location );
    }
};
