// Libraries
import _ from "underscore";
import Chance from "chance";
// Application Helpers
import EventFactory from "objects/EventFactory";
import RuleBreaker from "objects/RuleBreaker";
// Models & Collections
import File from "models/file";
// Internal Components
import FileUploadFileComponent from "component/files/UploadFile";
import FileUploadTransport from "component/files/UploadTransport";

var name = "uploadFileComponent";
var chance = new Chance();
var events;

function addFileAfterAdder( adder, file ){
    adder.$el.after( file.el );
}

function generateFileStructs( file, upload, opt ){
    var newFile = new FileUploadFileComponent( { "file": file, "options": opt } );
    var id = newFile.getId();
    var transportPackage = {
        "file": file
    };

    if( _( opt ).has( "nameOverride" ) ){
        transportPackage.nameOverride = opt.nameOverride;
    }

    upload.children.push( newFile );
    upload.files[ id ] = newFile;
    upload.transports[ id ] = FileUploadTransport.upload( [ transportPackage ], opt.endpoint );

    return newFile;
}

function respondToFile( file, upload ){
    upload.listenTo(
        file.vent,
        "remove",
        function fileRemoveEventListener(){
            this.stopListening( file.vent );

            this.children = _( this.children ).without( file );
            delete this.files[ file.getId() ];
            delete this.transports[ file.getId() ];

            this.vent.trigger( "state:update", {
                "upload": upload,
                "options": upload.options,
                "files": upload.files
            } );
        }
    );

    upload.listenTo(
        file.vent,
        "upload:done",
        function fileUploadDoneEventListener( data ){
            this.vent.emit( "file:upload:done", {
                "file": file,
                "remote": data.file,
                "transport": this.transports[ file.getId() ]
            } );
        }
    );
}

events = {
    "child:file:add": function childFileAddedEventHandler( data ){
        var upload = data.upload;
        var file = data.add.file;
        var emitter = data.add.emitter;
        var newFile = generateFileStructs( file, upload, data.options );

        addFileAfterAdder( emitter.adder, newFile );
        respondToFile( newFile, upload );

        this.trigger( "state:update", {
            "upload": upload,
            "options": upload.options,
            "files": upload.files
        } );
    },
    "upload": function uploadEventHandler( options ){
        var upload = options.upload;
        var transports = options.transports;
        var files = options.files;

        this.trigger( "state:update", {
            "upload": upload,
            "options": upload.options,
            "files": files
        } );

        _( transports ).each( function uploadTransportsIterator( transport, id ){
            var file = files[ id ];

            if( file.viewModel.getState() === "READY" ){
                file.pending();

                transport
                    .send()
                    .progress( function transportProgressHandler(){
                        file.progress( chance.floating( { "fixed": 4, "min": 0, "max": 0.9999 } ) );
                    } )
                    .done( function transportDoneHandler( data ){
                        RuleBreaker.apiLinks.remove( data );

                        file.done( new File( data ) );
                    } )
                    .fail( function transportFailHandler(){
                        file.fail();
                    } );
            }
        } );
    },
    "state:update": function updateStateEventHandler( context ){
        var uploader = context.upload;
        var viewState = uploader.viewModel;
        var options = context.options;
        var files = context.files;
        var failedFiles;
        var readyFiles;
        var progressingFiles;
        var doneFiles;
        var pendingFiles;
        var controls;
        var newState;

        function countFilesInState( filesList, state ){
            var count = _.chain( filesList )
                .filter( ( file ) => file.getViewData().getState() == state )
                .size()
                .value();

            return count;
        }

        function shouldShowControls( pendingFilesCount, useExternal = false ){
            var should = true;

            if( pendingFilesCount || useExternal ){
                should = false;
            }

            return should;
        }

        readyFiles          = countFilesInState( files, "READY" );
        pendingFiles        = countFilesInState( files, "PENDING" );
        progressingFiles    = countFilesInState( files, "PROGRESSING" );
        doneFiles           = countFilesInState( files, "DONE" );
        failedFiles         = countFilesInState( files, "FAIL" );
        controls = shouldShowControls( _( files ).size() == 0 || readyFiles == 0, options.externalControls );

        newState = {
            "ready": readyFiles,
            "pending": pendingFiles,
            "done": doneFiles,
            "fail": failedFiles,
            "progressing": progressingFiles,
            "controlsVisible": controls
        };

        // Update State
        viewState.set( newState );
    }
};

export default function(){
    this.register = EventFactory.register( "unique", name, events );
}
