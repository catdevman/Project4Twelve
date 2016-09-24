import _ from "underscore";
import Utilities from "utilities";
import ModelFormatter from "objects/ModelFormatter";

function Model(){}

Model.prototype.formatter = ModelFormatter;

Model.prototype.getChanged = function getChanged(){
    var changed = this.changedAttributes;

    if( this.blacklist ){
        changed = _( changed ).omit( this.blacklist );
    }

    return changed;
};

Model.prototype.cleanup = function cleanup( content ){
    var flattened = Utilities.application.flattenJson( content );

    delete flattened[ "_links" ];

    return flattened;
};

Model.prototype.getAttributesCopy = function getAttributesCopy(){
    return _( this.attributes ).clone();
};

Model.prototype.toApiModel = function toApiModel(){
    return this.formatter.format( this, this.apiMap );
};

export default Model;
