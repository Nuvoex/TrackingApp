/**
 * Created by Admin on 20/01/17.
 */
//@flow
'use strict';

function warn(error) {
    console.warn(error.message || error);
    throw error;
}

module.exports = store => next => action =>
    typeof action.then === 'function'
        ? Promise.resolve(action).then(next, warn)
        : next(action);
