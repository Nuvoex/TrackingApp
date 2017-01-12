/**
 * Created by Khushi on 10/01/17.
 */

import {StyleSheet} from 'react-native';
import * as GLOBAL from '../utils/Globals';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchCard: {
        alignSelf: 'stretch',
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: 'row',
    },
    searchEditText: {
        fontSize: GLOBAL.SIZE.MEDIUM_TEXT,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 0.8
    },
    search: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    close: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    historyCard: {
        marginTop: 72
    },
    historyTitle: {
        color: GLOBAL.COLOR.DARK_CYAN,
        fontFamily: 'sans-serif-medium'
    }
})