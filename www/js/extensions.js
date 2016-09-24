/**
 * A set of extensions to JavaScript itself
 * @module extensions
 */

// Some string additions to make redundant string manipulations simpler
String.prototype.uppercaseFirst = function uppercaseFirst(){
    return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
};

String.prototype.uppercaseWords = function uppercaseWords(){
    return this.replace(
        /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,
        function stringUppercaseWordsRegexReplacer( $1 ){
            return $1.toUpperCase();
        }
    );
};

if( !String.prototype.trim ){
    ( function trimIife(){
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

        String.prototype.trim = function trim(){
            return this.replace( rtrim, "" );
        };
    } )();
}

// Add some handy date tools
if( !Date.now ){
    Date.now = function now(){
        return new Date().getTime();
    };
}
