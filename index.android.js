/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  ListView,
  View,
  ToolbarAndroid,
} from 'react-native';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';

import {
  MKButton,
  getTheme,
} from 'react-native-material-kit';

const theme = getTheme();

//var ProgressBar = require('react-native-progress-bar');


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class Tracking extends Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      shipment_id: ' ',
      client_name: ' ',
      origin_city: ' ',
      destination_city: ' ',
      location: ' ',
      updated_at: ' ',
      description: ' ',
      dataSource: ds.cloneWithRows([' ']),
      progress: 0
    };
  }

    _handlePress() {
      this.setState ({
        loading: true
      });
     console.log('Pressed!');

     var obj = {
       method: 'GET',
       headers: {
         'Accept': 'application/vnd.jackson.v1',
         'Content-Type': 'application/json'
     }};

     fetch('http://nolan.nuvoex.com:80/api/shipment/track?awb[]='+this.state.shipment_id,obj)
     .then((response) => response.json())
     .then((responseJson) => {
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
         dataSource: ds.cloneWithRows(responseJson[0].history),
       });
      //this.setState({showText: 'aaa'});
      //console.log('responce '+ responseJson[0].client_name);
     })
     .catch((error) => { console.error(error); });
    }

  render() {



    var banner;
    if (this.state.status){
      banner = (
        <View>

          <View style={theme.cardStyle}>
            <Text>Awb {this.state.awb}</Text>
            <Text>Client {this.state.client_name}</Text>
            <Text>Origin {this.state.origin_city}</Text>
            <Text>Destination {this.state.destination_city}</Text>
            <Text>Location {this.state.location}</Text>
            <Text>Updated At {this.state.updated_at}</Text>
            <Text>Description {this.state.description}</Text>
          </View>
          <Text>History:</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View>
                <Text>{rowData.description}</Text>
                <Text>{rowData.location}</Text>
                <Text>{rowData.updated_at}</Text>
              </View>
            }
          />
        </View>
      )
    } else if(this.state.awb){
        banner = (
          <View>
            <Text style={{color: '#F00', padding:16}}>Shipment {this.state.awb} not found</Text>
          </View>
        )
    }

    var content;
    if (this.state.loading === false) {

      const ColoredRaisedButton = MKButton.coloredButton()
        .withText('Search')
        .withOnPress(() => {
          console.log("Hi, it's a colored button!");
          this._handlePress();
        })
        .build();

      content = (
        <View>
          <ToolbarAndroid
            style={styles.toolbar}
            title="TRACKING SHIPMENT" />
            <View style={{flex:1, padding:16}}>
              <TextInput keyboardType="numeric" placeholder="Enter Shipment ID" onChangeText={(shipment_id) => this.setState({shipment_id})} />
              <ColoredRaisedButton />
              {banner}
          </View>
        </View>
      )
    } else {
      content =(
        <View style={{alignItems: 'center'}}>
          <Progress.CircleSnail colors={['red', 'green', 'blue']} />
        </View>
      )
    }

    return (
      <ScrollView>
        <View style={{flex:1}}>
          {content}
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({ toolbar: { backgroundColor: '#e9eaed', height: 56, }, });

AppRegistry.registerComponent('infinity', () => Tracking);
