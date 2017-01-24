/**
 * Created by Khushi on 12/01/17.
 */

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-material-design';
import * as GLOBAL from '../../utils/Globals';
import LabelItem from '../detail/LabelItem';

export default class HistoryRowItem extends Component {
    render() {
        return (
            <View style={styles.historyContainer}>
                <View style={styles.lineCol}>
                    <View style={styles.circle}/>
                </View>
                <View style={styles.shipmentDetailCol}>
                    <LabelItem title={GLOBAL.STRINGS.LOCATION} detail="Banglore"/>
                    <LabelItem title={GLOBAL.STRINGS.UPDATED_AT} detail="18:38:52 | 29Dec"/>
                    <Text>Shipment received & being processed at hub Bengaluru_Hub_Name</Text>
                    <View style={styles.divider}/>
                </View>
            </View>
        );
    }
}

let circleSize = 12;
let circleRadius = circleSize / 2;

const styles = StyleSheet.create({
    historyContainer: {
        flexDirection: 'row'
    },
    lineCol: {
        flexDirection: 'column'
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleRadius,
        borderColor: GLOBAL.COLOR.BLACK_54,
        borderWidth: 2,
        marginTop: 4
    },
    shipmentDetailCol: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 12
    },
    divider: {
        height: GLOBAL.SIZE.DIVIDER_HT,
        marginTop: 18,
        marginRight: -GLOBAL.SIZE.DEFAULT_MARGIN,
        backgroundColor: GLOBAL.COLOR.DIVIDER
    }
});