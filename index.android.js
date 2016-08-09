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
  View
} from 'react-native';
import Button from 'react-native-button';

class Tracking extends Component {

  constructor(props, context) {
    //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props, context);
    this.state = {
      shipment_id: ' ',
      client_name: ' ',
      origin_city: ' ',
      destination_city: ' ',
      location: ' ',
      updated_at: ' ',
      description: ' ',
      history: ' ',
      //history: ds.cloneWithRows([' ']),
    };
  }

    _handlePress() {
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
         awb: responseJson[0].awb,
         client_name: responseJson[0].client_name,
         origin_city: responseJson[0].origin_city,
         destination_city: responseJson[0].destination_city,
         status: responseJson[0].status,
         location: responseJson[0].location,
         updated_at: responseJson[0].updated_at,
         description: responseJson[0].description,
         history: responseJson[0].history,
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
          <Text>awb = {this.state.awb}</Text>
          <Text>client_name = {this.state.client_name}</Text>
          <Text>origin_city = {this.state.origin_city}</Text>
          <Text>destination_city = {this.state.destination_city}</Text>
          <Text>status = {this.state.status}</Text>
          <Text>location = {this.state.location}</Text>
          <Text>updated_at = {this.state.updated_at}</Text>
          <Text>description = {this.state.description}</Text>
        </View>
      )
    } else if(this.state.awb){
        banner = (
          <View>
           <Text>Shipment not found</Text>
          </View>
        )
    }

    return (
      <ScrollView>
        <View style={{flex:1}}>
          <Text style={{alignItems:'center', fontSize:50}}> Tracking Shipment </Text>
          <Text style={{color:'blue',fontSize:20}}> Shipment ID </Text>
          <TextInput placeholder="Type here" onChangeText={(shipment_id) => this.setState({shipment_id})} />
          <Button
            style={{color:'green'}}
            onPress={() => this._handlePress()}>
            Search
          </Button>
          {banner}
        </View>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('infinity', () => Tracking);
