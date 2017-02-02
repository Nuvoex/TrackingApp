/**
 * Created by Khushi on 23/01/17.
 * @flow
 */
'use strict';

import React from 'react';
import {AppState, StyleSheet, StatusBar, View} from 'react-native';
import Home from './components/home/Home';
import * as GLOBAL from './utils/Globals';

const {connect} = require('react-redux');

const TrackingApp = React.createClass({
    render:function() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={GLOBAL.COLOR.DARK_PRIMARY}
                />
                <Home/>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = connect()(TrackingApp);