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
    "prayerlist": function prayerListEventHandler(){
        var prayerListView = new PrayerListView();

        /* eslint no-console: 0 */
        console.log( "I got to prayer list" );

        return prayerListView;
    },
    "dreamteam": function dreamTeamListEventHandler(){
        var dreamTeamView = new DreamTeamView();

        /* eslint no-console: 0 */
        console.log( "I got to dream team" );

        return dreamTeamView;
    }
} );

export default node;
