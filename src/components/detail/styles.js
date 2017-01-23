/**
 * Created by Khushi on 04/01/17.
 */
import {StyleSheet} from 'react-native';
import * as GLOBAL from '../../utils/Globals';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        alignItems: 'center'
    },
    toolbar: {
        backgroundColor: GLOBAL.COLOR.PRIMARY,
        height: GLOBAL.SIZE.TOOLBAR_HT
    },
    editTextField: {
        margin: 8
    },
    historyContainer: {
        flexDirection: 'row'
    },
    lineCol: {
        flexDirection: 'column'
    },
    ShipmentContainer: {
        marginTop: GLOBAL.SIZE.DEFAULT_MARGIN
    },
    shipmentDetailCol: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 12
    },
    heading: {
        marginLeft: 8,
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500'
    },
    historyCard: {
        paddingTop: 8
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderColor: 'grey',
        borderWidth: 2
    },
    line: {
        backgroundColor: 'grey',
        width: 1,
        flex: 1,
        marginLeft: 4,
        marginTop: 7,
        marginBottom: 4
    },
    blankTopLine: {
        backgroundColor: GLOBAL.COLOR.WHITE,
        width: 1,
        height: 5,
        marginLeft: 4
    },
    errorMsg: {
        color: GLOBAL.COLOR.RED,
        padding: GLOBAL.SIZE.STANDARD_PADDING
    }
})
