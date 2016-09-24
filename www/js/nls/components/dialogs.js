import I18n from "objects/I18n";

import Modals from "translations/components/dialogs/modal.json";
import Warnings from "translations/components/dialogs/warning.json";

var i18n = new I18n();

i18n.loadDefinitions(
    {
        "modal": Modals,
        "warning": Warnings
    }
);

export default i18n.localize();
