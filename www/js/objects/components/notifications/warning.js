// // Libraries
// import Backbone from "strap/backbone";
// import _ from "underscore";
//
// // Templates and Translations
// import template from "vw/components/notifications/warning.html";
// import translations from "nls/components/dialogs";
//
// var warning = translations.warning.emptyData;
//
// var WarningNoticeComponentView = Backbone.View.extend( {
//     "template": _.template( template ),
//     "initialize": function initialize( location = "default" ){
//         this.heading = warning[ location ].heading;
//         this.message = warning[ location ].message;
//
//         this.render();
//     },
//     "render": function render(){
//         this.$el.html( this.template( {
//             "heading": this.heading,
//             "message": this.message
//         } ) );
//
//         return this;
//     }
// } );
//
// export default WarningNoticeComponentView;
