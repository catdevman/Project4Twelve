// // Libraries
// import Backbone from "strap/backbone";
// import _ from "underscore";
//
// // Templates and Translations
// import template from "vw/components/notifications/modal.html";
// import translations from "nls/components/dialogs";
//
// var trans = translations.modal;
//
// var ModalComponentView = Backbone.View.extend( {
//     "className": "box overlay",
//     "template": _.template( template ),
//
//     "events": {
//         "click button.cancel": function cancelImporterClose( evt ){
//             evt.currentTarget.blur();
//
//             this.remove();
//         },
//         "click button.delete": function confirmImporterClose( evt ){
//             evt.currentTarget.blur();
//
//             this.trigger( "modal:confirm" );
//         }
//     },
//
//     "initialize": function initialize( constructionData ){
//         this.targetView = constructionData.targetView;
//
//         this.setOptions( constructionData.options );
//         this.render();
//         this.addConfirm();
//     },
//     "render": function render(){
//         var position = _( [ this.options.positionX, this.options.positionY ] ).without( "center" );
//         var positionString = _( position ).reduce( ( x, y ) => `${x} ${y}` );
//         var overlayTarget = this.options.overlayTargetSelector;
//         var hasTarget = overlayTarget && !_.isEmpty( overlayTarget );
//
//         this.$target = hasTarget ? this.targetView.$el.find( overlayTarget ) : this.targetView.$el;
//
//         this.$el
//             .html( this.template( this.options.content ) )
//             .addClass( positionString );
//
//         this.$target
//             .css( "position", "relative" )
//             .append( this.$el );
//     },
//     "setOptions": function setOptions( options ){
//         this.options = _.defaults( options, {
//             "positionX": "center",
//             "positionY": "center",
//             "content": {
//                 "warning": trans.warning,
//                 "cancel": trans.cancel,
//                 "confirm": trans.confirm
//             },
//             "overlayTargetSelector": ""
//         } );
//     },
//     "addConfirm": function addModalConfirm(){
//         this.targetView.listenTo(
//             this,
//             "modal:confirm",
//             () => this.targetView.trigger( "modal:confirm" )
//         );
//     }
// } );
//
// export default ModalComponentView;
