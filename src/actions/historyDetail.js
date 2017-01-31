/**
 * Created by Khushi on 25/01/17.
 * @flow
 */
'use strict';

import type{
    Action,
    ThunkAction
} from './types';

const {
    FETCH_HISTORY_DETAIL_REQUEST,
    FETCH_HISTORY_DETAIL_SUCCESS,
    FETCH_HISTORY_DETAIL_FAILED
} = require('../network/constants').default;

const ApiFactory= require('../network/ApiFactory').default;

function historyRequest(): Action{
    return{
        type: FETCH_HISTORY_DETAIL_REQUEST
    }
}

function historySuccess(data: JSON):Action {
    return{
        type: FETCH_HISTORY_DETAIL_SUCCESS,
        data: {
            awb: data[0].awb,
            client_name: data[0].client_name,
            origin_city: data[0].origin_city,
            destination_city: data[0].destination_city,
            location: data[0].location,
            updated_at: data[0].updated_at,
            description: data[0].description,
        }
    }
}

function historyFailure(error: ApiError):Action {
    return{
        type: FETCH_HISTORY_DETAIL_FAILED,
        error: error
    }
}

function fetchHistoryData(filter: string): ThunkAction {
    return dispatch =>{
        console.log ('inside history detail');
        dispatch(historyRequest());
        return ApiFactory().getHistoryDetailData(filter).then(function (json) {
            console.log('success ok tracking' +JSON.stringify(json));
            dispatch(historySuccess(json));
        }).catch((error)=>{
            console.log('failure tracking' +JSON.stringify(error));
            dispatch(historyFailure(error));
        })
    }
}

module.exports = {
    fetchHistoryData
};