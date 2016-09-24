import Authentication from "ajax/core/authentication";
import Cookies from "cookies-js";
import Utilities from "utilities";

var Security = {};

function authenticate( username, password, demoAccount, location ){
    return Authentication.login( username, password, demoAccount, location );
}

Security.requestAuthentication = function normalAuthenticationRequest( username, password, location ){
    return authenticate( username, password, null, location );
};

Security.requestDemoAuthentication = function demoAuthenticationRequest( account ){
    return authenticate( "", "", account );
};

Security.setAuthentication = function login( authenticatedUser ){
    Cookies.set(
        "fe-auth",
        Utilities.string.base64.encode( JSON.stringify( authenticatedUser ) )
    );
};

Security.logout = function logout(){
    // Cookies.expire( "fe-auth" );
};

Security.isAuthenticated = function isAuthenticated(){
    var authentication = Security.getAuthentication();

    return !!authentication;
};

Security.getAuthentication = function getAuthentication(){
    var cookie = Cookies.get( "fe-auth" ) || "";
    var authString = Utilities.string.base64.decode( cookie );
    var auth;

    try{
        auth = JSON.parse( authString );
    }
    catch( unparseableJson ){
        auth = false;
    }

    return auth;
};

export default Security;
