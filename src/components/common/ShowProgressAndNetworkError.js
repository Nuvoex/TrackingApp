/**
 * Created by Khushi on 31/01/17.
 */

import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import * as GLOBAL from '../../utils/Globals';
import NetworkError from './NetworkError';

const {height, width} = Dimensions.get('window');

const {NETWORK_ERROR} = require('../../network/constants').default;

const styles = StyleSheet.create({
    progressbar: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
        elevation: 3
    },
    parent: {
        flex: 1,
        backgroundColor: GLOBAL.COLOR.APP_THEME
    }
});

class ShowProgressAndNetworkError extends Component {
    static get defaultProps() {
        return {
            showError: {
                handleErrorView: false
            },
            showContentWhileLoading: false
        }
    }

    render() {
        let content = this.props.children;
        let loader = (
            <ActivityIndicator
                style={[styles.progressbar,
                this.props.showContentWhileLoading && {
                    backgroundColor: GLOBAL.COLOR.LOADER_TRANSPARENT_BACKGROUND
                }
                ]}
                size="large"
            />
        );

        if (this.props.showError && !this.props.showError.handleErrorView) {
            if (this.props.showError.type == NETWORK_ERROR) {
                content = (
                    <NetworkError
                        onPress={this.props.onRetry}/>
                )
            }
            else {
                content = (
                    <NetworkError
                        onPress={this.props.onRetry}
                        errorTitle={this.props.showError.message}/>
                )
            }
        }

        let showContentWhileLoading;
        if (this.props.showContentWhileLoading) {
            showContentWhileLoading = (
                <View style={styles.parent}>
                    {content}
                    {loader}
                </View>
            )
        }
        else {
            showContentWhileLoading = (
                <View style={styles.parent}>
                    {loader}
                </View>
            )
        }

        let mainContent;
        if(this.props.showLoading){
            mainContent = showContentWhileLoading
        }
        else{
            mainContent=(
                <View style={styles.parent}>
                    {content}
                </View>
            )
        }

        return(
            <View style={styles.parent}>
                {mainContent}
            </View>
        )
    }
}
export default ShowProgressAndNetworkError;