import _ from "underscore";

var UiCoordinatePlaneModule = {};

function queryItemsByItem( item ){
    var query = item.className ? "getElementsByClassName" : "getElementsByTagName";

    return document[ query ]( item.className || item.tagName );
}

function getSegment( plane, item ){
    var segment = UiCoordinatePlaneModule.rowFromElement( item );

    if( plane == "y" ){
        segment = UiCoordinatePlaneModule.columnFromElement( item );
    }

    return segment;
}

function getElementBoundingBox( element ){
    return element.getBoundingClientRect();
}

function getVisibleBoundingBox(){
    return getElementBoundingBox( document.body );
}

function between( a, b, test ){
    return ( a <= test ) && ( b >= test );
}

UiCoordinatePlaneModule.getBoundingBox = function getBoundingBox( item ){
    var bounds;

    if( item ){
        bounds = getElementBoundingBox( item );
    }
    else{
        bounds = getVisibleBoundingBox();
    }

    return bounds;
};

UiCoordinatePlaneModule.rowFromElement = function rowFromElement( item ){
    var { "top": top, "bottom": bottom } = this.getBoundingBox( item );

    return {
        "top": top,
        "bottom": bottom,
        "middle": top + ( ( bottom - top ) / 2 ),
        "isElementContained": ( element ) => {
            let boundingBox = this.getBoundingBox( element );

            return between( top, bottom, boundingBox.top + ( boundingBox.height / 2 ) );
        }
    };
};

UiCoordinatePlaneModule.columnFromElement = function columnFromElement( item ){
    var { "left": left, "right": right } = this.getBoundingBox( item );

    return {
        "left": left,
        "right": right,
        "middle": left + ( ( right - left ) / 2 ),
        "isElementContained": ( element ) => {
            let boundingBox = this.getBoundingBox( element );

            return between( left, right, boundingBox.left + ( boundingBox.width / 2 ) );
        }
    };
};


UiCoordinatePlaneModule.getLastOfItemInPlane = function getLastOfItemInPlane( item, plane = "y" ){
    var items = queryItemsByItem( item );
    var segment = getSegment( plane, item );

    var filteredItems = _( items ).filter(
        ( element ) => segment.isElementContained( element )
    );

    return filteredItems.length ? filteredItems.pop() : null;
};

export default UiCoordinatePlaneModule;
