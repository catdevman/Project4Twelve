/* Broken Rules - A Haiku by Tom Randolph

    A file of sorrows
    It breaks the linter's good rules
    Truly, sadness lasts

*/

/* eslint no-underscore-dangle:0 */
/* eslint no-console:0 */

import _ from "underscore";

var RuleBreaker = {};

RuleBreaker.dataHasEmbedded = function dataHasEmbedded( data ){
    return _( data ).has( "_embedded" );
};

RuleBreaker.getEmbedded = function getEmbedded( data ){
    if( RuleBreaker.dataHasEmbedded( data ) ){
        return data._embedded;
    }
};

RuleBreaker.apiLinks = {
    "get": function get( response ){
        return response._links;
    },
    "remove": function remove( response ){
        delete response._links;
    }
};

RuleBreaker.getSuper = function getSuper( object ){
    /* wow this doozy breaks code standards AND style standards.
       Calling __super__ (even an internal super) is generally __super__ frowned-upon.
    */
    return object.__super__;
};

RuleBreaker.console = {
    "log": function log( message ){
        if( console && console.log ){
            console.log( message );
        }
    },
    "warn": function warn( message ){
        if( console && console.warn ){
            console.warn( message );
        }
    },
    "error": function error( message ){
        if( console && console.error ){
            console.error( message );
        }
    }
};

export default RuleBreaker;
