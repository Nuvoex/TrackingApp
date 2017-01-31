/**
 * Created by Khushi on 23/01/17.
 */
// @flow

import NativeEnv from 'react-native-native-env';

const BASE_STAGING_URL = 'http://nolan-stg.nuvoex.com';
const BASE_PROD_URL = 'http://nolan.nuvoex.com';

module.exports = {
    TRACK_SHIPMENT_URL: '/api/shipment/open-track',

    getBaseUrl(){
        if (NativeEnv.get('isPROD')) {
            return BASE_PROD_URL;
        }
        else {
            return BASE_STAGING_URL;
        }
    },
    getHistoryListUrl(filter: string){
        return this.TRACK_SHIPMENT_URL + '?awb=' + filter;
    }
}