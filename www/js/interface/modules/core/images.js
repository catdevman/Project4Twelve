var UiImageModule = {};

UiImageModule.loadImage = function loadImage( src, callback ){
    var image = new Image();

    if( typeof callback == "function" ){
        image.onload = () => callback( image );
    }

    image.src = src;

    return image;
};

export default UiImageModule;
