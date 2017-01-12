/**
 * Created by Khushi on 10/01/17.
 */

// @flow

'use strict';

import React, {Component} from 'react';
import {ToolbarAndroid, StyleSheet, View, Text} from 'react-native';
import * as GLOBAL from '../utils/Globals';

export type Layout = 'default';

export type Foreground = 'light' | 'dark';

export type Item = {
    title?: string;
    icon?: number;
    layout?: Layout;
    onPress?: () => void;
};

export type Props = {
    title?: string;
    leftItem?: Item;
    rightItem?: Item;
    extraItems?: Array<Item>;
    foreground?: Foreground;
    style?: any;
};

class Toolbar extends Component {
    props:Props;

    render() {
        const {leftItem, rightItem, extraItems} = this.props;
        let actions = [];

        if (rightItem) {
            const {title, icon, layout} = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always'
            });
        }

        if (extraItems) {
            actions = actions.concat(extraItems.map((item) => ({
                title: item.title,
                show: 'never'
            })));
        }

        let content;
        if (React.Children.count(this.props.children) > 0) {
            content = (
                <View collapsable={false} style={{flex: 1}}>
                    {this.props.children}
                </View>
            );
        }

        return (
            <View>
                <ToolbarAndroid
                    navIcon={leftItem && leftItem.icon}
                    onIconClicked={leftItem && leftItem.onPress}
                    title={this.props.title}
                    titleColor={GLOBAL.COLOR.WHITE}
                    actions={actions}
                    onActionSelected={this.handleActionSelected.bind(this)}
                    style={styles.toolbar}>
                    {content}
                </ToolbarAndroid>
            </View>

        );
    }

    handleActionSelected(position:number) {
        let items = this.props.extraItems || [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }
}

const TOOLBAR_HEIGHT = 56;

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: GLOBAL.COLOR.PRIMARY,
        height: TOOLBAR_HEIGHT
    }
});
export default Toolbar;
