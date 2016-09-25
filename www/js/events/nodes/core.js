// Internal Components
import EventManager from "objects/EventManager";

// Layouts & Views
import HomeView from "core-root/views/home";
import PrayerListView from "core-root/views/prayer-list";
import DreamTeamView from "core-root/views/dream-team";

var node;


node = EventManager.listen( "core", {
    "home": function homeEventHandler(){
        var homeView = new HomeView();

        return homeView;
    },
    "prayer-list": function prayerListEventHandler(){
        var prayerListView = new PrayerListView();

        return prayerListView;
    },
    "dream-team": function dreamTeamListEventHandler(){
        var dreamTeamView = new DreamTeamView();

        return dreamTeamView;
    }
} );

export default node;
