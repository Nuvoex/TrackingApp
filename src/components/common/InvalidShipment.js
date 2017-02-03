/**
 * Created by Khushi on 02/02/17.
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import * as GLOBAL from '../../utils/Globals';

class InvalidShipment extends Component {

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.container}>
                    <Image source={require('../../res/image/invalid_awb.png')}/>
                    <Text style={styles.title}>{GLOBAL.STRINGS.NOT_FOUND}</Text>
                    <Text style={styles.message}>{GLOBAL.STRINGS.INVALID_SHIPMENT}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        position: 'absolute',
        top: GLOBAL.SIZE.INVALID_MARGIN_TOP,
        bottom:0,
        left:0,
        right:0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 22,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: 'sans-serif-medium'

    },
    message: {
        fontSize: 14,
        color: GLOBAL.COLOR.BLACK_54,
        alignSelf: 'stretch',
        textAlign: 'center',
    }
});

export default InvalidShipment;
