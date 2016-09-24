/**
 * A lightweight module to manage in-memory storage
 *
 * @module objects/Storage
 */

/**
 * @alias module:objects/Storage
 */
var Storage = {};

/**
 * Sets some data in in-memory storage
 *
 * @memberof module:objects/Storage
 * @alias set
 *
 * @param {string} key - The name to store the data under
 * @param {(Object|Array|string|number|boolean)} value - The data to store
 *
 * @returns {module:objects/Storage} - The Storage object for further chaining
 */
Storage.set = function set( key, value ){
    window[ window.ns ].storage[ key ] = value;

    return this;
};

/**
 * Gets some data from in-memory storage
 *
 * @memberof module:objects/Storage
 * @alias get
 *
 * @param {string} key - The name to fetch the data from
 *
 * @returns {(Object|Array|string|number|boolean|undefined)} - The value as requested (or undefined if empty or not set)
 */
Storage.get = function get( key ){
    return window[ window.ns ].storage[ key ];
};

/**
 * Deletes some data from in-memory storage
 *
 * @memberof module:objects/Storage
 * @alias del
 *
 * @param {string} key - The name of the data to delete
 * @returns {undefined}
 */
Storage.del = function del( key ){
    delete window[ window.ns ].storage[ key ];
};

export default Storage;
