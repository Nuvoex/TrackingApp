/**
 * Created by Khushi on 10/01/17.
 */

import React, {Component} from 'react';
import {Text, View, Image, TextInput, LayoutAnimation} from 'react-native';
import {Card, Icon} from 'react-native-material-design';
import styles from './styles';
import Toolbar from '../common/Toolbar';
import * as GLOBAL from '../utils/Globals'

export default class Home extends Component {

    state = {
        isSearching: false
    };

    handleFocus = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isSearching: true,
        });
    };

    render() {
        const logo = {
            title: 'nuvoex',
            icon: GLOBAL.ICONS.NUVOEX
        };

        let positionStyle, cardStyle;
        if (!this.state.isSearching) {
            positionStyle = {
                justifyContent: 'center'
            };
            cardStyle = {
                marginLeft: 30,
                marginRight: 30,
                marginTop: 38
            }
        }
        else {
            positionStyle = {
                position: 'absolute',
                top: 0,
                left: 8,
                right: 8,
                justifyContent: 'flex-start',
            };
            cardStyle = {
                marginLeft: 0,
                marginRight: 0,
                marginTop: 24
            }
        }

        return (
            <View style={styles.container}>

                <Toolbar
                    title={GLOBAL.STRINGS.TRACK_SHIPMENT}
                    leftItem={logo}
                />

                <View style={[styles.searchContainer, positionStyle]}>
                    <Image source={require('../../res/image/nuvoex.png')}
                           style={styles.nuvoexImg}/>
                    <Card style={[styles.searchCard, cardStyle]}>
                        <View style={styles.search}>
                            <Icon name='search'/>
                        </View>
                        <TextInput
                            style={styles.searchEditText}
                            returnKeyType='search'
                            placeholder={GLOBAL.STRINGS.SEARCH_PLACEHOLDER}
                            placeholderTextColor={GLOBAL.COLOR.BLACK_37}
                            keyboardType='numeric'
                            underlineColorAndroid={GLOBAL.COLOR.TRANSPARENT}
                            onFocus={this.handleFocus}
                        />
                        <View style={styles.close}>
                            <Icon name="close"/>
                        </View>
                    </Card>
                </View>

                <Card style={styles.historyCard}>
                    <Text style={styles.historyTitle}>History</Text>
                </Card>
            </View>
        )
    }
}