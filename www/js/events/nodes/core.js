// Internal Components
import EventManager from "objects/EventManager";

// Layouts & Views
import HomeView from "core-root/views/home";

var node;


node = EventManager.listen( "core", {
    "home": function homeEventHandler(){
        var homeView = new HomeView();

        return homeView;
    }
} );

export default node;
