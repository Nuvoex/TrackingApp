/**
 * Created by Admin on 04/01/17.
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

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