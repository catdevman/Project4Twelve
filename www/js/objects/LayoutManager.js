import PivotMainLayout from "layouts/main";

var LayoutManager = {};

function hasLayout( type ){
    return window[ window.ns ].layouts.hasManagedLayout && ( window[ window.ns ].layouts.hasManagedLayout === type );
}

function hasAnyLayout(){
    return window[ window.ns ].layouts.hasManagedLayout;
}

function internalGetLayout(){
    return window[ window.ns ].layouts.managed;
}

function internalSetLayout( type, renderedLayout ){
    window[ window.ns ].layouts.managed = renderedLayout;
    window[ window.ns ].layouts.hasManagedLayout = type;
}

function internalClearLayout(){
    window[ window.ns ].layouts.hasManagedLayout = false;
}

LayoutManager.getLayout = function getLayout( type, fallback ){
    var layout;
    var response;

    if( hasLayout( type ) ){
        response = internalGetLayout();
    }
    else if( hasAnyLayout() && typeof type === "undefined" ){
        response = internalGetLayout();
    }
    else{
        layout = fallback();

        internalSetLayout( type, layout );

        response = layout;
    }

    return response;
};

LayoutManager.clearLayout = function clearLayout(){
    internalClearLayout();

    return this;
};

LayoutManager.renderLayout = function renderLayout( name = "main", FallbackLayout = PivotMainLayout ){
    var layout = this.getLayout( name, function layoutFallback(){
        var iLayout = new FallbackLayout();

        iLayout.render();

        return iLayout;
    } );

    return layout;
};

export default LayoutManager;
