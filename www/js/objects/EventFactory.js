import Chance from "chance";
import EventManager from "objects/EventManager";

var chance = new Chance();
var factory = {};

factory.unique = function uniqueListen( scope, events ){
    var uniqId = scope + "-" + chance.guid();
    
    return EventManager.listen( uniqId, events );
};

factory.listen = function normalListen( scope, events ){
    return EventManager.listen( scope, events );
};

factory.register = function registerCreator( type, name, events ){
    return function register(){
        return factory[ type ]( name, events );
    };
};

export default factory;
