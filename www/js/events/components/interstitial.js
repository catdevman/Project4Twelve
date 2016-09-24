import EventManager from "objects/EventManager";


var node = EventManager.listen( "interstitialComponent", {
    "decoupled": function decoupleEventHandler( ){
        this.emit( "interstitial:decoupled" );
    },
    "remove:store": function removeFrameFromStoreHandler( target ){
        this.broadcast( "pivot:data:remove", [ target.cid ] );
    }
} );

export default node;
