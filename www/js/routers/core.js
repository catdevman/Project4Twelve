// Internal Components
import Routes from "objects/Routes";
// Event Node
import CoreEventNode from "events/nodes/core";
// Data and Config
import coreRoutes from "febe/routes/core.json";

var CoreRoutesLoader = {};

CoreRoutesLoader.startup = function startup( router ){
    /* eslint no-console: 0 */
    console.log( router, coreRoutes, CoreEventNode, "core"  );
    Routes.load( router, coreRoutes, CoreEventNode, "core" );
};

export default CoreRoutesLoader;
