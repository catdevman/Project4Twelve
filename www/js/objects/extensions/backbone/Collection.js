import _ from "underscore";
import Backgrid from "strap/backgrid";
import Utilities from "utilities";
import ModelFormatter from "objects/ModelFormatter";
import RuleBreaker from "objects/RuleBreaker";

var Collection = {
    "cleanup": function cleanup( content ){
        var flattened = Utilities.application.flattenJson( content );

        delete flattened[ "_links" ];

        return flattened;
    },
    "getModels": function getModels( embeddedName, response ){
        var self = this;
        var unpacked = this.cleanup( response );
        var models = unpacked;

        if( unpacked.total_items === 0 ){
            models = [];
        }
        else{
            models = _( unpacked[ embeddedName ] ).map( function collectionModelUnpackMapper( model ){
                var newModel = self.cleanup( model );

                if( self.model.prototype.apiMap ){
                    newModel = ModelFormatter.unformat( newModel, self.model.prototype.apiMap );
                }

                return newModel;
            } );
        }

        return models;
    },

    "parseLinks": function parseLinks( response ){
        var flatter = Utilities.application.flattenJson( response );
        var links = RuleBreaker.apiLinks.get( flatter );
        var obj = {};

        function getHref( key, unparsed ){
            return unparsed[ key ] ? unparsed[ key ].href : undefined;
        }

        function setHref( key, href, flattened ){
            if( href ){
                flattened[ key ] = href;
            }
        }

        setHref( "first", getHref( "first", links ), obj );
        setHref( "prev", getHref( "prev", links ), obj );
        setHref( "next", getHref( "next", links ), obj );
        setHref( "last", getHref( "last", links ), obj );

        return obj;
    },

    "offset": function offset( alpha, beta ){
        var alphaPos = this.indexOf( alpha );
        var betaPos = this.indexOf( beta );
        var response = false;

        if( alphaPos > -1 && betaPos > -1 ){
            response = betaPos - alphaPos;
        }

        return response;
    },

    "tabulate": function tabulate(){
        var IdentifiableRow = Backgrid.Row.extend( {
            "events": {
                "click": function backgridIdentifiableRowClickHandler( e ){
                    this.model.collection.trigger(
                        "click:backgrid:row", {
                            "event": e,
                            "model": this.model
                        } );
                }
            }
        } );
        var grid = new Backgrid.Grid( {
            "row": IdentifiableRow,
            "columns": this.tables.columns,
            "collection": this,
            "emptyText": this.tables.emptyText || "Empty"
        } );

        return grid;
    },
    "paginate": function paginate(){
        var options = _( this.pages || {} ).defaults( {
            "windowSize": 10,
            "slideScale": 0.5,
            "goBackFirstOnSort": true
        } );

        return new Backgrid.Extension.Paginator( {
            "collection": this,
            "windowSize": options.windowSize,
            "slideScale": options.slideScale,
            "goBackFirstOnSort": options.goBackFirstOnSort
        } );
    }
};

export default Collection;
