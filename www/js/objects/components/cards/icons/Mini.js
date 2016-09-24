// // Libraries
// import _ from "underscore";
//
// // Internal Components
// import CardComponentView from "component/cards/Mini";
// import template from "vw/components/cards/building/mini.html";
//
// var MiniBuildingCardComponentView = CardComponentView.extend( {
//     "template": _.template( template ),
//
//     "bindings": {
//         "h3.name": "text:name",
//         ".visual-identity img": "toggle:picture"
//     },
//     "events": {
//         "click .card": function cardClickHandler(){
//             this.model.trigger( "click:card", {
//                 "model": this.model,
//                 "route": "buildings"
//             } );
//         }
//     },
//     "computeds": {
//         "useDefaultPicture": {
//             "deps": [ "picture" ],
//             "get": function useDefaultPictureGetter( picture ){
//                 return !picture;
//             }
//         }
//     },
//
//     "initialize": function initialize( constructionData ){
//         this.model = constructionData.model;
//         this.modifiers = constructionData.collectionView.cardModifiers || constructionData.modifiers || [];
//
//         this.render();
//     }
// } );
//
// export default MiniBuildingCardComponentView;
