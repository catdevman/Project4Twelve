import I18n from "objects/I18n";
import Login from "translations/components/authentication/login.json";

var i18n = new I18n();

i18n.loadDefinitions(
    {
        "login": Login
    }
);

export default i18n.localize();
