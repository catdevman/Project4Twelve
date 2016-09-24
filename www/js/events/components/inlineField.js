import EventManager from "objects/EventManager";
import IfUi from "interface/components/inlineField";
import Utilities from "utilities";

var ifUi = new IfUi();
var vent;

function bindListeners( id ){
    return EventManager.listen( "inlineFieldComponent" + "-" + id, {
        "focus": function focusEventHandler( eventData ){
            ifUi.focusField( eventData.field );
        }
    } );
}

function InlineFieldEvents(){
    this.id = Utilities.string.random( 3 ) + ( new Date() ).getTime();
    this.vent = bindListeners( this.id );
}

vent = new InlineFieldEvents();

export default vent;
