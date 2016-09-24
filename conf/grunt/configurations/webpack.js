var path = require( "path" );
var webpack = require( "webpack" );
var clone = require( "clone" );

var root = path.resolve( __dirname, "../../../" ) + "/";
var defaultConf = {
    "output": {},
    "resolve": {
        "alias": {
            "lyt": root + "www/content/templates/layouts",
            "vw": root + "www/content/templates/views",
            "translations": root + "www/content/translations",
            "config": root + "www/content/config",
            "vendor": root + "build/vendor",
            "data": root + "www/content/data",
            "febe": root + "www/febe",

            "core-root": root + "www/js/apps/core",
            "strap": root + "www/js/objects/bootstrappers",
            "component": root + "www/js/objects/components",

            "ajax": root + "www/js/ajax",
            "apps": root + "www/js/apps",
            "collections": root + "www/js/collections",
            "events": root + "www/js/events",
            "interface": root + "www/js/interface",
            "layouts": root + "www/js/layouts",
            "models": root + "www/js/models",
            "nls": root + "www/js/nls",
            "objects": root + "www/js/objects",
            "routers": root + "www/js/routers",

            "extensions$": root + "www/js/extensions.js",
            "utilities$": root + "www/js/utilities.js",
        }
    },
    "plugins": [
        new webpack.IgnorePlugin( /\.\/locale/, /\.\/~\/moment\/moment\.js/ )
    ],
    "module": {
        "loaders": [
            {
                "loader": "babel",
                "test": /\.[ej]s[6]?$/,
                "exclude": [
                    "node_modules"
                ],
                "query": {
                    "presets": [ "es2015" ]
                }
            },
            {
                "loader": "html",
                "test": /\.html$/
            },
            {
                "loader": "json",
                "test": /\.json$/
            }
        ]
    },
    "htmlLoader": {
        "attrs": false
    },
    "devtool": "source-maps",
    "failOnError": true,
    "stats": false && {
        "colors": true,
        "modules": true,
        "reasons": true
    }
};
var project4TwelveConf = clone( defaultConf );

project4TwelveConf.entry = "./www/js/project4twelve.js";
project4TwelveConf.output = {
    "path": "./build/js/",
    "filename": "project4twelve.js"
};

console.log( project4TwelveConf );
module.exports = function webpackConfigLoader(){
    return {
        "project4twelve": project4TwelveConf
    };
};
