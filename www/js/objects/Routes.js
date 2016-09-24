// External Libraries
import _ from "underscore";
import Chance from "chance";

var chance = new Chance();

export default {
    "load": function loadRoutes( router, routes, node, name = chance.word( { "length": 10 } ) ){
        window[ window.ns ].routes[ name ] = routes;

        _( routes ).chain()
            .filter(
                ( route ) => _( route.parts ).has( "event" )
            )
            .map(
                ( route ) => [ `${route.route.sammy}`, route.parts.event, route.page, route.name ]
            )
            .each(
                ( definition ) => {
                    var route = definition[ 0 ];
                    var triggerable = definition[ 1 ];

                    router.get( RegExp( route ), function routeHandler( context ){
                        node.trigger( triggerable, {
                            "meta": {
                                "app": context,
                                "verb": context.verb,
                                "route": context.path
                            },
                            "params": context.params.splat
                        } );
                    } );
                }
            );
    }
};
