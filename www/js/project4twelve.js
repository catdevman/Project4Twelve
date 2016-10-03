// External Libraries
import _ from "underscore";
import Sammy from "sammy";

// Routers
import CoreRoutes from "routers/core";

// System Events
import "events/project4twelve";

var router = new Sammy( ".app" );
var loadedAt = document.location.pathname + document.location.search + document.location.hash;
var loaded = 0;
var loaders = [
    CoreRoutes
];

_( loaders ).each(
    ( loader ) => {
        loader.startup( router );

        loaded++;

        if( loaded == loaders.length ){
            router.run( loadedAt );
        }
    }
);
