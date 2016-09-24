import I18n from "objects/I18n";

import FilesAdder from "translations/components/files/adder.json";
import FilesFile from "translations/components/files/file.json";
import FilesControls from "translations/components/files/controls.json";

var i18n = new I18n();

i18n.loadDefinitions(
    {
        "adder": FilesAdder,
        "file": FilesFile,
        "controls": FilesControls
    }
);

export default i18n.localize();
