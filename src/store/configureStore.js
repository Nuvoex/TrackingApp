/**
 * Created by Khushi on 20/01/17.
 */
//@flow
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
const promise = require('./promise');
const reducers = require('../reducers');
import {persistStore, autoRehydrate} from 'redux-persist';
const {AsyncStorage} = require('react-native');

const createTrackingStore = applyMiddleware(thunk, promise)(createStore);

function configureStore(onComplete: ?() => void) {
    const store = autoRehydrate()(createTrackingStore)(reducers);
    persistStore(store, {storage: AsyncStorage}, onComplete);
    return store;
}

module.exports = configureStore;