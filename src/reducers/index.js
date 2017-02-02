/**
 * Created by Admin on 20/01/17.
 */
//@flow
'use strict';

const {combineReducers} = require('redux');

module.exports = combineReducers({
    historyReducer: require('./HistoryReducer'),
});