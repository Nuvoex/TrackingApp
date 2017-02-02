/**
 * Created by Khushi on 31/01/17.
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
} from 'react-native';
import {Icon} from 'react-native-material-design';
import * as GLOBAL from '../../utils/Globals';

class NetworkError extends Component {

    static get defaultProps() {
        return {
            errorTitle: GLOBAL.STRINGS.NETWORK_ERROR_TITLE,
        };
    }

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.errorTitle}</Text>
                    <Text style={[styles.title,styles.message]}>{GLOBAL.STRINGS.NETWORK_ERROR_MESSAGE}</Text>
                    <TouchableNativeFeedback
                        onPress={this.props.onPress}>
                        <View style={styles.refreshContainer}>
                            <Icon name="refresh" color={GLOBAL.COLOR.WHITE} onPress={this.props.onPress}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

const refreshSize = 40;

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: GLOBAL.COLOR.BLACK_54,
        fontSize: 18,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
    },
    refreshContainer: {
        alignSelf: 'center',
        marginTop: GLOBAL.SIZE.DEFAULT_MARGIN,
        backgroundColor: GLOBAL.COLOR.ACCENT,
        width: refreshSize,
        height: refreshSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: refreshSize / 2,
    },
});

export default NetworkError;
