/**
* Uses EventFactory.register to register all of the events related to file uploaders.
* Used in the Admin app to allow teachers to add files to their test collections.
* @see module:admin-root/views/core/tests/import
* @module events/components/files/adder
* @requires external:underscore
* @requires module:interface/components/files/adder
* @requires module:objects/EventFactory
* @requires module:utilities
*/

import _ from "underscore";
import UploadUi from "interface/components/files/adder";
import EventFactory from "objects/EventFactory";
import Utilities from "utilities";

var ui = new UploadUi();
var name = "uploadFileAdderComponent";

/** {object} events - an object of event management functions */
var events = {
    "enter": function enterEventHandler( data ){
        var view = data.view;

        ui.updateDropUi( view, view.settings.hover );
    },
    "over": function overEventHandler( data ){
        var dragOverEvent = data.event;

        /** Stops propagation and prevents default to indicate "drop allowed" **/
        dragOverEvent.stopPropagation();
        dragOverEvent.preventDefault();
    },
    "drop": function dropEventHandler( data ){
        var self = this;
        var view = data.view;
        var dropEvent = data.event.originalEvent;
        var dropData = dropEvent.dataTransfer;
        var droppedFiles = dropData.files;

        dropEvent.stopPropagation();
        dropEvent.preventDefault();

        _( droppedFiles ).each( function droppedFileIterator( file ){
            self.emit( "file:add", {
                "file": file,
                "emitter": {
                    "id": self.info.name,
                    "vent": self,
                    "adder": view
                }
            } );
        } );

        ui.updateDropUi( view, view.settings.waiting );
    },
    "end": function endEventHandler( data ){
        var dragEvent = data.event;
        var view = data.view;

        dragEvent.stopPropagation();
        dragEvent.preventDefault();

        ui.updateDropUi( view, view.settings.waiting );
    },
    "click:browseFiles": function browseFilesEventHandler( data ){
        data.target.click();
    },
    "input:change": function inputChangeEventHandler( data ){
        var self = this;
        var evt = data.event;
        var fileInput = evt.currentTarget;
        var eventData = {
            "file": fileInput, // Assume that we can't parse the input into a FileList
            "emitter": {
                "id": self.info.name,
                "vent": self,
                "adder": data.view
            }
        };

        if( Utilities.features.file ){ // We can parse the input into a FileList
            _( fileInput.files ).each( function inputFileIterator( file ){
                eventData.file = file;

                self.emit( "file:add", eventData );
            } );
        }
        else{
            self.emit( "file:add", eventData );
        }

        ui.resetFileInput( fileInput );
    }
};

export default function(){
    this.register = EventFactory.register( "unique", name, events );
}
