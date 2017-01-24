/**
 * Created by Khushi on 10/01/17.
 */

import {StyleSheet} from 'react-native';
import * as GLOBAL from '../../utils/Globals';

let titleTopMargin = GLOBAL.SIZE.DEFAULT_MARGIN;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GLOBAL.COLOR.APP_THEME
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: GLOBAL.COLOR.APP_THEME,
    },
    searchCard: {
        alignSelf: 'stretch',
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: 'row',
        margin: 0,
        backgroundColor: GLOBAL.COLOR.SEARCH_CARD
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
    greenTitle: {
        color: GLOBAL.COLOR.DARK_CYAN,
        fontFamily: 'sans-serif-medium',
        marginTop: titleTopMargin
    },
    statusCard: {
        marginTop: 74,
        paddingBottom: titleTopMargin
    },
    statusTitle: {
        marginBottom: 12
    },
    historyTitle: {
        marginBottom: GLOBAL.SIZE.DEFAULT_MARGIN
    },
    status1: {
        fontSize: GLOBAL.SIZE.LARGE_TEXT,
        flexDirection: 'row'
    },
    historyCard: {
        marginTop: 2
    },
    divider: {
        marginTop: GLOBAL.SIZE.DEFAULT_MARGIN,
        marginBottom: GLOBAL.SIZE.DEFAULT_MARGIN,
        height: GLOBAL.SIZE.DIVIDER_HT,
        backgroundColor: GLOBAL.COLOR.DIVIDER,
        marginLeft: -GLOBAL.SIZE.DEFAULT_MARGIN,
        marginRight: -GLOBAL.SIZE.DEFAULT_MARGIN
    },
    clientRow: {
        flexDirection: 'row'
    },
    client: {
        color: GLOBAL.COLOR.BLACK_87,
        fontSize: GLOBAL.SIZE.MEDIUM_TEXT,
        fontFamily: 'sans-serif-medium',
        marginBottom: GLOBAL.SIZE.DEFAULT_MARGIN,
        flex: 0.7
    },
    timestamp: {
        fontSize: GLOBAL.SIZE.SMALL_TEXT,
        color: GLOBAL.COLOR.BLACK_54,
        flex: 0.3
    },
    detailContainer: {
        zIndex: -1
    }
})