/**
 * Created by Admin on 04/01/17.
 */

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as GLOBAL from '../utils/Globals';

export default class LabelItem extends Component {

    render() {
        return (
            <View style={styles.labelRow}>
                <Text style={styles.label}>{this.props.title}</Text>
                <Text style={styles.detail}>{this.props.detail}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    labelRow:{
        flexDirection: 'row',
        paddingBottom: 4,
    },
    label: {
        flex: 0.4,
        fontFamily: 'sans-serif-medium',
        color: GLOBAL.COLOR.BLACK_54
    },
    detail: {
        flex: 0.6,
        color: GLOBAL.COLOR.BLACK_54
    },

})