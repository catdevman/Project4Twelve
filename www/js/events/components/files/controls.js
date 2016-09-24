import EventFactory from "objects/EventFactory";

var name = "uploadFileControlsComponent";
var events = {
    "click:button:start": function startClickEventHandler( data ){
        this.emit( "upload:start", {
            "view": data.view
        } );
    }
};

export default function(){
    this.register = EventFactory.register( "unique", name, events );
}
