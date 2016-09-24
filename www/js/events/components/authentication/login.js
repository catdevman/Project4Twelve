import _ from "underscore";

import EventFactory from "objects/EventFactory";
import Security from "objects/Security";
import Ui from "interface/components/authentication/login";

import translations from "nls/components/authentication";

var ui = new Ui();
var name = "loginComponent";
var trans = translations.login;
var events;

function resetValidation( elements ){
    _( elements ).each(
        ( element ) => {
            ui.toggleValidationError( element );
        }
    );
}

function basicValidation( elements ){
    var isSubmittable = true;

    if( elements.username.value == "" ){
        ui.toggleValidationError( elements.username, true, trans.validation.username );
        isSubmittable = false;
    }

    if( elements.password.value == "" ){
        ui.toggleValidationError( elements.password, true, trans.validation.password );
        isSubmittable = false;
    }

    return isSubmittable;
}

function toggleLogin( button, enabled = true ){
    if( enabled ){
        button.removeAttribute( "disabled" );
    }
    else{
        button.setAttribute( "disabled", "disabled" );
    }
}

function handleLoginErrors( config, viewModel ){
    ui.resetLogin( config.elements[ 0 ], viewModel );

    _( config.elements ).each(
        ( element ) => {
            ui.toggleValidationError( element, true, config.message );
        }
    );
}

function handleLoginEdgeCases( message, validation, viewModel ){
    if( message == "abort" ){
        resetValidation( validation.skip.elements );
    }
    else if( message == "type" ){
        viewModel.set( "canLogin", false );
    }
    else{
        handleLoginErrors( validation.else, viewModel );
    }
}

function handleLoginFailure( message, elements, viewModel ){
    var validation = {
        "credentials": {
            "elements": [ elements.form ],
            "message": trans.validation.credentials
        },
        "subscription": {
            "elements": [ elements.form ],
            "message": trans.validation.subscription
        },
        "skip": {
            "elements": [ elements.form ]
        },
        "else": {
            "elements": [ elements.form ],
            "message": trans.validation.generic
        }
    };

    if( _( validation ).has( message ) ){
        handleLoginErrors( validation[ message ], viewModel );
    }
    else{
        handleLoginEdgeCases( message, validation, viewModel );
    }
}

events = {
    "submit:form": function formSubmitEventHandler( context ){
        var submitButton = ui.$( context.form ).find( "button[type='submit']" );

        submitButton.click();
    },
    "click:button:submit": function submitButtonClickEventHandler( context ){
        var spinner = ui.makeSpinner( context.button, true, -1 );
        var form = ui.$( context.button ).closest( "form" )[ 0 ];

        toggleLogin( context.button, false );

        this.trigger( "authenticate", {
            "spinner": spinner,
            "form": form,
            "viewModel": context.viewModel
        } );

        context.button.blur();
    },
    "click:button:back": function backButtonClickEventHandler( context ){
        context.viewModel.loginTimedOut( false );
        toggleLogin( context.button );
        ui.resetLogin( ui.$( context.button ).closest( "form" )[ 0 ], context.viewModel );
    },
    "keyup:input": function inputKeyupEventHandler( context ){
        var form = ui.$( context.input ).closest( "form" )[ 0 ];

        ui.toggleValidationError( context.input );
        ui.toggleValidationError( form );
        toggleLogin( ui.$( 'button[type="submit"]', form )[ 0 ], true );
    },
    "authenticate": function formSubmitAuthenticationEventHandler( context ){
        var self = this;
        var form = context.form;
        var username = form.elements[ "username" ];
        var password = form.elements[ "password" ];
        var location = form.elements[ "location" ];
        var spinner = context.spinner;
        var elements = {
            "form": form,
            "username": username,
            "password": password,
            "location": location
        };
        var loginPromise;

        resetValidation( elements );
        if( basicValidation( elements ) ){
            loginPromise = Security.requestAuthentication(
                username.value,
                password.value,
                location ? location.value : null
            );

            context.viewModel.attemptingLogin();
            ui.messageUserAboutLongRunningLogin( loginPromise, form, context.viewModel );

            loginPromise
                .then(
                    function successHandler( response ){
                        self.trigger( "authentication:complete", {
                            "user": response.identity,
                            "redirect": response.redirect,
                            "spinner": spinner
                        } );
                    },
                    function failHandler( xhr ){
                        self.trigger( "authentication:fail", {
                            "message": xhr.responseJSON ? xhr.responseJSON.message : "abort",
                            "spinner": spinner,
                            "elements": elements,
                            "viewModel": context.viewModel
                        } );
                    }
                );
        }
        else{
            spinner.restore();
        }
    },
    "authentication:complete": function authenticationSuccessEventHandler( context ){
        this.trigger( "authentication:finish", {
            "spinner": context.spinner,
            "state": true,
            "do": function authenticationSuccessCallback( button ){
                toggleLogin( button, false );
                Security.setAuthentication( context.user );

                window.top.location = context.redirect;
            }
        } );
    },
    "authentication:fail": function authenticationFailureEventHandler( context ){
        handleLoginFailure( context.message, context.elements, context.viewModel );

        this.trigger( "authentication:finish", {
            "spinner": context.spinner,
            "state": false,
            "do": function authenticationFailureCallback( button ){
                context.viewModel.attemptingLogin( false );
                toggleLogin( button, true );
                Security.logout();
            }
        } );
    },
    "authentication:finish": function authenticationFinishEventHandler( context ){
        var spinner = context.spinner;
        var didAuthenticate = context.state;
        var callback = context.do;
        var call = "restore";
        var wait = callback;

        if( spinner ){
            if( didAuthenticate ){
                call = "done";
                wait = 750;
            }
            else{
                call = "fail";
                wait = null;
            }
        }

        spinner[ call ]( wait, callback );
    }
};

export default function(){
    this.register = EventFactory.register( "unique", name, events );
}
