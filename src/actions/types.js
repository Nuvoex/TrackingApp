/**
 * Created by Khushi on 19/01/17.
 */
//@flow

const {
    NETWORK_ERROR,
    SERVER_ERROR,
    FETCH_HISTORY_DETAIL_REQUEST,
    FETCH_HISTORY_DETAIL_SUCCESS,
    FETCH_HISTORY_DETAIL_FAILED
} = require('../network/constants').default;

export type ApiErrorType= NETWORK_ERROR | SERVER_ERROR;
export type ApiError = {type: ApiErrorType, statusCode: number, data: any}
export type Action = {type: FETCH_HISTORY_DETAIL_REQUEST}|
    {type: FETCH_HISTORY_DETAIL_SUCCESS}|
    {type: FETCH_HISTORY_DETAIL_FAILED, error: ApiError}

export type Dispatch= (action: Action | ThunkAction| PromiseAction| Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;