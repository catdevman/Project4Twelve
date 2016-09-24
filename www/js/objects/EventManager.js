/**
 * The event manager that creates other event listeners
 * @module objects/EventManager
 *
 * @requires underscore
 * @requires strap/backbone
 * @requires chance
 */

import _ from "underscore";
import Backbone from "strap/backbone";
import Chance from "chance";
import utilities from "utilities";

var chance = new Chance();
var EventManager;

function getArgsArray( args ){
    return Array.prototype.slice.call( args );
}

/** @alias module:objects/EventManager */
EventManager = _.extend( {}, Backbone.Events, {
    /**
     * Creates a listener in the channel listing
     *
     * @memberof module:objects/EventManager
     * @param {string} scope - the name of the listener
     * @param {Object.<string, Function>} events - the hash of event names and handlers
     *
     * @example
     * // Sets up an event listener for the event "test" in the scope "Documentation"
     * var vent = EventManager.listen( "Documentation", {
     *     "test": function(){
     *         console.log( "the `test` event was fired on the `Documentation` scope!" );
     *     }
     * } );
     *
     * @returns {Object} vent - An event listener bound to the specified scope
     */
    "listen": function listen( scope, events ){
        var list = window[ window.ns ].channels[ scope ] = _.extend( {}, Backbone.Events, {
            "info": {
                "name": scope,
                "id": chance.guid()
            },
            "broadcast": function broadcast(){
                EventManager.trigger.apply( EventManager, getArgsArray( arguments ) );
            },
            "emit": function emitter(){
                list.trigger.apply( list, getArgsArray( arguments ) );
            }
        } );

        _( events ).each( function eventIterator( behavior, name ){
            list.on( name, function eventCallback(){
                var args = getArgsArray( arguments );

                behavior.apply( list, args );
            } );
        } );

        list.on( "all", function allEventsHandler(){
            var args = getArgsArray( arguments );
            var name = args.shift();
            var parts = name.split( ":" );
            var topScope = parts.shift();
            var channels = _( window[ window.ns ].channels ).keys();

            if( _( channels ).indexOf( topScope ) === -1 ){
                parts.unshift( topScope );
                args.unshift( scope + ":__bubbling__:" + parts.join( ":" ) );

                // FIXME - This is just a hack to test for app-only events
                // TODO - Why are odd events being fired on these event handlers?
                if( name.charAt( name.length - 1 ) !== ":" ){
                    EventManager.trigger.apply( EventManager, args );
                }
            }
        } );

        list.listenTo(
            EventManager,
            "all",
            function eventManagerInternalAllListener(){
                var args = getArgsArray( arguments ); // eg: [ "scope:event:fire", param1, param2 ]
                var parts = args.shift().split( ":" ); // [ "scope", "event", "fire" ]
                var topScope = parts.shift(); // "scope"
                var bubbling = false;
                var matching = scope === topScope;
                var eventName;

                function isBubblingSetter(){
                    if( parts[ 0 ] === "__bubbling__" ){
                        parts.shift();
                        bubbling = true;
                    }
                }

                function addScopeIfNotMatching(){
                    if( !matching ){
                        eventName = topScope + ":" + eventName;
                    }
                }

                function emitter(){
                    if( ( !bubbling && matching ) || !matching ){
                        list.trigger.apply( list, args );
                    }
                }


                isBubblingSetter();
                eventName = parts.join( ":" );
                addScopeIfNotMatching();

                if( window[ window.ns + "-expose-all-events" ] ){
                    utilities.console.log( `----------
🏠: ${list.info.name}
🔥: ${eventName}` );
                }

                args.unshift( eventName );
                emitter();
            }
        );

        return list;
    },
    /**
     * Retrieves an event listener by name
     *
     * @memberof module:objects/EventManager
     *
     * @param {string} scope - The name of the listener
     * @returns {Object|undefined} vent - The scoped event listener or undefined (if the scope doesn't exist)
     */
    "getScope": function getScope( scope ){
        return window[ window.ns ].channels[ scope ];
    }
} );

export default EventManager;
