/**
 * @module util
 */
 
/**
 * Builds a FD returned from _getFormData into a formData array
 * Borrowed from foundry.js
 * @param {*} FD 
 */
export function buildFormData(FD) {
    const dtypes = FD._dtypes;

    // Construct update data object by casting form data
    let formData = Array.from(FD).reduce((obj, [k, v]) => {
    let dt = dtypes[k];
    if ( dt === "Number" ) obj[k] = v !== "" ? Number(v) : null;
    else if ( dt === "Boolean" ) obj[k] = v === "true";
    else if ( dt === "Radio" ) obj[k] = JSON.parse(v);
    else obj[k] = v;
    return obj;
    }, {});

    return formData;
}

/**
 * Retrieves a key using the given value
 * @param {Object} object -- the object that contains the key/value
 * @param {*} value 
 */
export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}