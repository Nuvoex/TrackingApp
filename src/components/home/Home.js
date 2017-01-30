/**
 * Created by Khushi on 10/01/17.
 */

import React, {Component} from 'react';
import {Text, View, Image, TextInput, LayoutAnimation, ScrollView} from 'react-native';
import {Card, Icon} from 'react-native-material-design';
import styles from './styles';
import Toolbar from '../common/Toolbar';
import * as Urls from '../../utils/Urls';
import * as GLOBAL from '../../utils/Globals'
import HistoryRow from './HistoryRowItem';
import LabelItem from '../detail/LabelItem'

const {fetchHistoryData} = require('../../actions');
const {connect} = require('react-redux');

class Home extends Component {
    filter: Urls.TRACK_SHIPMENT_URL;

    constructor(props) {
        super(props);
        this.state = {
            isAnimation: false
        };
    }

    getHistoryData() {
        this.props.fetchHistoryData(this.filter)
    }

    //TODO: Animation handle
    handleFocus = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isAnimation: true,
        });
    };

    render() {
        const logo = {
            title: 'nuvoex',
            icon: GLOBAL.ICONS.NUVOEX
        };

        let positionStyle, cardStyle;
        if (!this.state.isAnimation) {
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
                left: 0,
                right: 0,
                padding: 8,
                justifyContent: 'flex-start'
            };
            cardStyle = {
                marginLeft: 0,
                marginRight: 0,
                marginTop: 18
            }
        }

        let shipmentDetailView = (
            <Card style={styles.statusCard}>
                <Text style={[styles.greenTitle, styles.statusTitle]}>Shipment Status</Text>
                <Text style={styles.status1}>
                    {this.props.description}
                </Text>
                <View style={styles.divider}/>
                <View style={styles.clientRow}>
                    <Text style={styles.client}>{this.props.client_name}</Text>
                    <Text style={styles.timestamp}>{this.props.updated_at}</Text>
                </View>
                <LabelItem title={GLOBAL.STRINGS.REACHED_AT} detail={this.props.location}/>
                <LabelItem title={GLOBAL.STRINGS.ORIGIN} detail={this.props.origin_city}/>
                <LabelItem title={GLOBAL.STRINGS.DESTINATION} detail={this.props.destination_city}/>
            </Card>
        );

        let historyDetailView = (
            <Card style={styles.historyCard}>
                <Text style={[styles.greenTitle, styles.historyTitle]}>History</Text>
                <HistoryRow/>
                <HistoryRow/>
                <HistoryRow/>
                <HistoryRow/>
                <HistoryRow/>
                <HistoryRow/>
            </Card>
        );

        let detailView = (
            <ScrollView style={styles.detailContainer}>
                {shipmentDetailView}
                {/*{historyDetailView}*/}
            </ScrollView>
        );

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
                            <Icon name='search' size={GLOBAL.SIZE.ICON}/>
                        </View>
                        <TextInput
                            style={styles.searchEditText}
                            returnKeyType='search'
                            placeholder={GLOBAL.STRINGS.SEARCH_PLACEHOLDER}
                            placeholderTextColor={GLOBAL.COLOR.BLACK_37}
                            keyboardType='numeric'
                            underlineColorAndroid={GLOBAL.COLOR.TRANSPARENT}
                            onFocus={this.handleFocus}
                            onChangeText={(shipment_id) => this.setState({shipment_id})}
                        />
                        <View style={styles.close}>
                            <Icon name="close" size={GLOBAL.SIZE.ICON}/>
                        </View>
                    </Card>
                </View>
            </View>
        )
    }
}

function mapStateToProps(store) {
    return {
        isFetching: store.historyReducer.isFetching,
        showError: store.historyReducer.showError,
        client_name: store.historyReducer.client_name,
        origin_city: store.historyReducer.origin_city,
        destination_city: store.historyReducer.destination_city,
        location: store.historyReducer.location,
        updated_at: store.historyReducer.updated_at,
        description: store.historyReducer.description,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHistoryData: (filter: number) => {
            dispatch(fetchHistoryData(filter));
        }
    }
};
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);