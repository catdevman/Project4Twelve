import EventFactory from "objects/EventFactory";

var name = "uploadFileFileComponent";
var events = {
    "click:remove": function removeClickEventHandler( data ){
        data.view.remove();
    },
    "progress:update": function updateProgressEventHandler( data ){
        var fileModel = data.file;

        fileModel.set( "progress", data.value );
    }
};

export default function(){
    this.register = EventFactory.register( "unique", name, events );
}
