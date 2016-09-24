/**
 * @module strap/backbone
 *
 * @requires backbone
 * @requires underscore
 *
 * @requires epoxy
 */

import Backbone from "backbone";
import _ from "underscore";
import C from "objects/extensions/backbone/Collection";
import M from "objects/extensions/backbone/Model";
import V from "objects/extensions/backbone/View";

import EpoxyButtonsHandler from "objects/extensions/epoxy/handlers/buttons";
import EpoxySwitchHandler from "objects/extensions/epoxy/handlers/switch";
import EpoxyPluralizeHandler from "objects/extensions/epoxy/handlers/pluralize";
import EpoxyNotEmptyFilter from "objects/extensions/epoxy/filters/notEmpty";
import EpoxyCountFilter from "objects/extensions/epoxy/filters/count";

import Validation from "backbone-validation";
import "backbone.epoxy";
import "backbone.paginator";

_( Backbone.Model.prototype ).extend( M.prototype );
_( Backbone.Model.prototype ).extend( Validation.mixin );

_( Backbone.Collection.prototype ).extend( C );
_( Backbone.View.prototype ).extend( V );

EpoxySwitchHandler.register( Backbone );
EpoxyButtonsHandler.register( Backbone );
EpoxyPluralizeHandler.register( Backbone );
EpoxyNotEmptyFilter.register( Backbone );
EpoxyCountFilter.register( Backbone );

export default Backbone;
