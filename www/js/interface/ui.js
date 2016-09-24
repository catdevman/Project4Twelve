/**
 * @module interface/ui
 *
 * @requires {@link external:underscore|Underscore}
 * @requires {@link external:jquery|jQuery}
 * @requires {@link external:moment|Moment}
 */

import _ from "underscore";
import $ from "strap/jquery";
import moment from "strap/moment";

function Interface(){
    this.$ = $;
    this._ = _;
    this.moment = moment;
    // this.Timezone = Timezone;
}

export default Interface;
