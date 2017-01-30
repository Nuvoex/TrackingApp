/**
 * Created by Khushi on 25/01/17.
 */
'use strict';

import Api from './Api';

export default function ApiFactory() {
    return new Api();
}
