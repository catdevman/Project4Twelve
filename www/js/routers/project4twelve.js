

var CoreRoutesLoader = {};

CoreRoutesLoader.startup = function startup( router ){
    router.notFound = function sammyRouteNotFoundHandler( verb, path ){
        var response = true;

        if( verb === "get" ){
            response = this.error( [ "404 Not Found", verb, path ].join( " " ) );
        }

        return response;
    };
};

export default CoreRoutesLoader;
