//@flow
'use strict';

import type {Action, ApiErrorType} from '../actions/types';
const {
    SERVER_ERROR,
    FETCH_HISTORY_DETAIL_REQUEST,
    FETCH_HISTORY_DETAIL_SUCCESS,
    FETCH_HISTORY_DETAIL_FAILED,
} = require('../network/constants').default;
import * as GLOBAL from '../utils/Globals';

export type Error = {
    message: ?string;
    type: ?ApiErrorType;
    handleErrorView:boolean,
}

export type State = {
    isFetching: boolean;
    showError: ?Error;
    awb: ?number;
    client_name: ?string;
    origin_city: ?string;
    destination_city: ?string;
    location: ?string;
    updated_at: ?string;
    description: ?string;

};

const initialState = {
    isFetching: true,
    shipment_id: ' ',
    client_name: ' ',
    origin_city: ' ',
    destination_city: ' ',
    location: ' ',
    updated_at: ' ',
    description: ' ',
    showError: null,

};

function historyList(state: State = initialState, action: Action): State {

    if (action.type === FETCH_HISTORY_DETAIL_REQUEST) {
        return initialState;
    }

    if (action.type === FETCH_HISTORY_DETAIL_SUCCESS) {
        let {shipment_id, client_name, origin_city, destination_city, location, updated_at, description} = action.data;
        console.log('HISTORY_DETAIL_SUCCESS action.data is ' + JSON.stringify(action.data));
        let output = {
            shipment_id,
            client_name,
            origin_city,
            destination_city,
            location,
            updated_at,
            description,
            isFetching: false,
            showError: null,
        };
        console.log('HISTORY_DETAIL_SUCCESS output is ' + JSON.stringify(output));
        return output;
    }

    if (action.type === FETCH_HISTORY_DETAIL_FAILED) {
        console.log("FETCH_HISTORY_DETAIL_FAILED");
        let type = action.error.type;
        let message;
        if (type === SERVER_ERROR) {
            message = GLOBAL.STRINGS.TRACKING_REQUEST_ERROR;
        }
        return {
            isFetching: false,
            data: null,
            showError: {
                message,
                type,
                handleErrorView: false,
            }
        };

    }

    return state;
}

module.exports = historyList;