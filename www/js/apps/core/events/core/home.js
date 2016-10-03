import EventManager from "objects/EventManager";
// import Window from "objects/Window";

var node = EventManager.listen( "CardGridView", {
    "open:view": function openView( data ){
        var url = data.url;

        /* eslint no-console: 0 */
        console.log( url, data );
        // Window.navigate( url );
        this.broadcast( "project4twelve:navigate", url );
    }
} );

export default node;
