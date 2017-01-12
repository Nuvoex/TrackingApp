/*
 * Created by Khushi on 03/01/17.
 *
 * @flow
 */


import React, {Component} from 'react';
import {
    Text,
    ScrollView,
    TextInput,
    ListView,
    View,
    ToolbarAndroid,
} from 'react-native';
import {Card} from 'react-native-material-design';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';
import styles from './styles';
import * as GLOBAL from '../utils/Globals';
import LabelItem from './LabelItem';

const MK = require('react-native-material-kit');

const {
    MKButton,
    MKColor,
} = MK;

MK.setTheme({
    primaryColor: MKColor.Green,
    accentColor: MKColor.Purple,
});


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export default class TrackingDetail extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            shipment_id: '1000585',
            client_name: ' ',
            origin_city: ' ',
            destination_city: ' ',
            location: ' ',
            updated_at: ' ',
            description: ' ',
            dataSource: ds.cloneWithRows([' ']),
            progress: 0,
        };
    }

    _handlePress() {
        this.setState({
            loading: true
        });
        console.log('Pressed!');

        var obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.jackson.v1',
                'Content-Type': 'application/json'
            }
        };

        fetch('http://nolan-stg.nuvoex.com/api/shipment/open-track?awb=' + this.state.shipment_id, obj)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("request successful");
                //;
                var history = [];
                for (var i = 0; i < responseJson[0].history.length; i++) {
                    history.push({
                        position: i,
                        data: responseJson[0].history[i],
                    });
                }
                this.setState({
                    loading: false,
                    awb: responseJson[0].awb,
                    client_name: responseJson[0].client_name,
                    origin_city: responseJson[0].origin_city,
                    destination_city: responseJson[0].destination_city,
                    status: responseJson[0].status,
                    location: responseJson[0].location,
                    updated_at: responseJson[0].updated_at,
                    description: responseJson[0].description,
                    dataSource: ds.cloneWithRows(history),
                    //  network_error_message:null,
                });
                //this.setState({showText: 'aaa'});
                //console.log('responce '+ responseJson[0].client_name);
            })
            .catch((error) => {
                console.log("request failed");
                //console.error(error);
                this.setState({
                    network_error_message: "Unable to Connect",
                    loading: false,
                });
            });
    }

    render() {

        let banner;

        if (this.state.status) {
            banner = (
                <View>
                    <Card>
                        <View style={styles.ShipmentContainer}>
                            <LabelItem title={GLOBAL.STRINGS.REACHED_AT} detail={this.state.location}/>
                            <LabelItem title={GLOBAL.STRINGS.AWB} detail={this.state.awb}/>
                            <LabelItem title={GLOBAL.STRINGS.CLIENT} detail={this.state.client_name}/>
                            <LabelItem title={GLOBAL.STRINGS.ORIGIN} detail={this.state.origin_city}/>
                            <LabelItem title={GLOBAL.STRINGS.DESTINATION} detail={this.state.destination_city}/>
                            <LabelItem title={GLOBAL.STRINGS.UPDATED_AT} detail={this.state.updated_at}/>
                            <LabelItem title={GLOBAL.STRINGS.DESCRIPTION} detail={this.state.description}/>
                        </View>
                    </Card>
                    <Text style={styles.heading}>HISTORY</Text>
                    <Card style={styles.historyCard}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) =>{
                                    var topLineStyle;
                                    topLineStyle=styles.blankTopLine;

                                    return (
                                        <View style={styles.historyContainer}>
                                            <View style={styles.lineCol}>
                                                <View style={topLineStyle}/>
                                                <View style={styles.circle}/>
                                                <View style={styles.line}/>
                                            </View>
                                            <View style={styles.shipmentDetailCol}>
                                                 <LabelItem title={GLOBAL.STRINGS.DESCRIPTION} detail={rowData.data.description}/>
                                                 <LabelItem title={GLOBAL.STRINGS.LOCATION} detail={rowData.data.location}/>
                                                 <LabelItem title={GLOBAL.STRINGS.UPDATED_AT} detail={rowData.data.updated_at}/>
                                            </View>
                                      </View>
                                    );
                                }}
                        />
                    </Card>
                </View>
            )
        } else if (this.state.network_error_message) {
            banner = (
                <View>
                    <Text style={styles.errorMsg}>{this.state.network_error_message}</Text>
                </View>
            )
        } else if (this.state.awb) {
            banner = (
                <View>
                    <Text style={styles.errorMsg}>Shipment {this.state.awb} not found</Text>
                </View>
            )
        }

        var content;
        if (this.state.loading === false) {


            const ColoredRaisedButton = MKButton.coloredFlatButton()
                .withText('Search')
                .withOnPress(() => {
                    console.log("Hi, it's a colored button!");
                    this._handlePress();
                })
                .build();

            content = (
                <View>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.editTextField}
                            keyboardType="numeric"
                            placeholder="Enter Shipment ID"
                            onChangeText={(shipment_id) => this.setState({shipment_id})}
                            onSubmitEditing={(event) => this._handlePress()}
                        />
                        <ColoredRaisedButton />
                        {banner}
                    </View>
                </View>
            )
        } else {
            content = (
                <View style={styles.center}>
                    <Progress.CircleSnail color={GLOBAL.COLOR.GREEN}/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    titleColor={GLOBAL.COLOR.WHITE}
                    title={GLOBAL.STRINGS.TRACK_SHIPMENT}/>
                <ScrollView>
                    <View style={styles.container}>
                        {content}
                    </View>
                </ScrollView>
            </View>

        );
    }
}