import I18n from "objects/I18n";
import Ui from "translations/ui.json";

var i18n = new I18n();

i18n.loadDefinitions(
    {
        "ui": Ui
    }
);

export default i18n.localize();
