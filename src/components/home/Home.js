/**
 * Created by Khushi on 10/01/17.
 */

import React, {Component} from 'react';
import {
    Text, View, Image,
    TextInput, LayoutAnimation, ScrollView,
    TouchableNativeFeedback, Platform, UIManager,
} from 'react-native';
import {Card, Icon} from 'react-native-material-design';
import styles from './styles';
import Toolbar from '../common/Toolbar';
import * as GLOBAL from '../../utils/Globals'
import HistoryRow from './HistoryRowItem';
import LabelItem from '../detail/LabelItem';
import ShowProgressAndNetworkError from '../common/ShowProgressAndNetworkError';

const {fetchHistoryData} = require('../../actions');
const {connect} = require('react-redux');
const PureListView = require('../common/PureListView');

const LIST_VIEW = 'historyDetailView';

type History = any;

type Props ={
    history: Array<History>;
}

type State = {
    isAnimation: Boolean;
    shipmentId: String;
    showHistory: Boolean;
    showCross: Boolean;
    detailView: Boolean;
}

const animation = {
    layout: {
        easeInEaseOut: {
            duration: 500,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                delay: 0,
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        },
    }
};

class Home extends Component {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            isAnimation: false,
            showHistory: false,
            showCross: false,
            shipmentId: '',
            detailView: false,
        };
        this.getHistoryData = this.getHistoryData.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.clearText = this.clearText.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        // Enable LayoutAnimation under Android
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    getHistoryData() {
        this.handleFocus();
        this.props.fetchHistoryData(this.state.shipmentId)
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.history && (this.props.history !== nextProps.history)) {
            this.setState({
                showHistory: (nextProps.history.length > 0)
            });
        }
    }

    clearText() {
        this.setState({
            shipmentId: ''
        });
    }

    handleFocus = () => {
        console.log('Starting Animation');
        LayoutAnimation.configureNext(animation.layout.easeInEaseOut);
        this.setState({
            isAnimation: true,
            detailView: true
        });
    };

    renderRow(data: History) {
        return (
            <HistoryRow
                history={data}/>
        )
    }

    renderContent() {
        let shipmentDetailView, historyDetailView;
        shipmentDetailView = (
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

        let listData = this.props.history;

        if (this.state.showHistory) {
            historyDetailView = (
                <Card style={styles.historyCard}>
                    <Text style={[styles.greenTitle, styles.historyTitle]}>History</Text>
                    <PureListView
                        ref={LIST_VIEW}
                        data={listData}
                        renderRow={this.renderRow}/>
                </Card>
            );
        }

        return (
            <ScrollView style={styles.detailContainer}>
                {shipmentDetailView}
                {historyDetailView}
            </ScrollView>
        );
    }


    render() {
        const logo = {
            title: 'nuvoex',
            icon: GLOBAL.ICONS.NUVOEX
        };

        let positionStyle, cardStyle, showCrossView, detailView;

        let shipmentLength = this.state.shipmentId.length;
        if (shipmentLength > 0) {
            showCrossView = (
                <TouchableNativeFeedback onPress={this.clearText}
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.close}>
                        <Icon name="close" size={GLOBAL.SIZE.ICON}/>
                    </View>
                </TouchableNativeFeedback>
            )
        }
        else {
            showCrossView = (
                <View style={styles.close}/>
            )
        }

        if(this.state.detailView) {
            detailView = (
                <ShowProgressAndNetworkError
                    showLoading={this.props.isFetching}
                    showError={this.props.showError}
                    onRetry={this.getHistoryData}>
                    {this.renderContent()}
                </ShowProgressAndNetworkError>
            );
        }

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
            };
            cardStyle = {
                marginLeft: 0,
                marginRight: 0,
                marginTop: 18
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
                            <Icon name='search' size={GLOBAL.SIZE.ICON}/>
                        </View>
                        <TextInput
                            style={styles.searchEditText}
                            returnKeyType='search'
                            placeholder={GLOBAL.STRINGS.SEARCH_PLACEHOLDER}
                            placeholderTextColor={GLOBAL.COLOR.BLACK_37}
                            keyboardType='numeric'
                            underlineColorAndroid={GLOBAL.COLOR.TRANSPARENT}
                            onChangeText={(shipmentId) => this.setState({shipmentId})}
                            value={this.state.shipmentId}
                            onSubmitEditing={()=> this.getHistoryData()}
                        />
                        {showCrossView}
                    </Card>
                </View>
                {detailView}
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
        history: store.historyReducer.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHistoryData: (filter: string) => {
            dispatch(fetchHistoryData(filter));
        }
    }
};
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);