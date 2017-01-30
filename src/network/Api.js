/**
 * Created by Khushi on 25/01/17.
 * @flow
 */
'use strict';

const {
    NETWORK_ERROR,
    SERVER_ERROR
} = require('./constants').default;

import type{ApiError, ApiErrorType} from '../actions/types';
import _ from 'underscore';
import * as Urls from '../utils/Urls';

function apiError(type: ApiErrorType, statusCode: number, data: any): ApiError {
    return {
        type: type,
        statusCode: statusCode,
        data: data
    }
}
export default  class Api {

    async getHistoryDetailData(filter: string) {
        return await this._fetch({
            method: 'GET',
            url: Urls.TRACK_SHIPMENT_URL(filter),
        }).then((res) => {
            console.log('Response status inside dashboard ' + res.status);
            if (res.status === 200) {
                return res.json[0];
            } else {
                throw (apiError(SERVER_ERROR, res.status, res.json))
            }
        }).catch((error) => {
            console.log('Catch Response error ' + JSON.stringify(error));
            if (error.type) {
                throw (error);
            } else {
                throw (apiError(NETWORK_ERROR, 0, error))
            }
        })
    }

    /**
     * ### _fetch
     * A generic function that prepares the request
     *
     * @returns object:
     *  {
     *      code: response.code,
     *      status: response.status,
     *      json: response.json()
     *  }
     */
    async _fetch(options) {
        options = _.extend({
            method: 'GET',
            url: null,
            body: null,
            callback: null
        }, options);

        const requestOptions = {
            method: options.method,
            headers: {
                'Accept': 'application/vnd.jackson.v1',
                'Content-Type': 'application/json'
            }
        };

        // if (this.accessToken) {
        //     console.log("Api accessToken " + this.accessToken);
        //     requestOptions.headers['Authorization'] = 'Bearer ' + this.accessToken
        // }

        if (options.body) {
            requestOptions.body = JSON.stringify(options.body)
        }

        let url = Urls.getBaseUrl() + options.url;
        console.log('Url is ' + url);
        console.log('reqOpts' + JSON.stringify(requestOptions));

        let res = {};

        let response = await fetch(url, requestOptions);
        res.status = response.status;
        res.code = response.code;

        console.log('Response status' + res.status);
        console.log('Response ' + JSON.stringify(response));

        return ( response.json()
                .then((json) => {
                    res.json = json;
                    return res
                }).catch((e) => {
                    return res
                })
        );
    }
}
