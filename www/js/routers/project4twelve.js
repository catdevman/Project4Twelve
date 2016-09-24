// External Libraries
import Rollbar from "strap/rollbar";

var CoreRoutesLoader = {};

CoreRoutesLoader.startup = function startup( router ){
    router.notFound = function sammyRouteNotFoundHandler( verb, path ){
        var response = true;

        if( Rollbar ){
            Rollbar.error( "404 Not Found", {
                "attempt": this.last_location[ 1 ]
            } );
        }
        else{
            if( verb === "get" ){
                response = this.error( [ "404 Not Found", verb, path ].join( " " ) );
            }

            return response;
        }
    };
};

export default CoreRoutesLoader;
