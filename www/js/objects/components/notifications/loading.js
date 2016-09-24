// // Libraries
// import Backbone from "strap/backbone";
// import _ from "underscore";
//
// // Templates and Translations
// import template from "vw/components/notifications/loading.html";
// import translations from "nls/ui";
//
// var LoadingComponentView = Backbone.View.extend( {
//     "className": "loading",
//     "template": _.template( template ),
//
//     "initialize": function initialize( constructionData = {} ){
//         var loadingCheck = ( constructionData.loading && !_( constructionData.loading ).isEmpty() );
//         var defaultLoadingText = translations.ui.notices.load.fetching;
//
//         this.loadingText = loadingCheck ? constructionData.loading : defaultLoadingText;
//
//         this.render();
//     },
//     "render": function render(){
//         this.$el.html( this.template( {
//             "loading": this.loadingText
//         } ) );
//
//         return this;
//     }
// } );
//
// export default LoadingComponentView;
