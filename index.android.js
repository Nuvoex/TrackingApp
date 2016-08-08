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
  View
} from 'react-native';
import Button from 'react-native-button';

class Tracking extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {showText: ' '};
  }

    _handlePress() {
     console.log('Pressed!');
     fetch('http://nolan-stg.nuvoex.com:80/api/shipment/track?awb[]=1000585')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         showText: responseJson[0].client_name
       });
      //this.setState({showText: 'aaa'});
      //console.log('responce '+ responseJson[0].client_name);
     })
     .catch((error) => { console.error(error); });
    }

  render() {
    let display = this.state.showText;
    return (
      <ScrollView>
        <View style={{flex:1}}>
          <Text style={{alignItems:'center', fontSize:50}}> Tracking Shipment </Text>
          <Text style={{color:'blue',fontSize:20}}> Shipment ID </Text>
          <TextInput placeholder="Type here" />
          <Button
            style={{color:'green'}}
            onPress={() => this._handlePress()}>
            Search
          </Button>
          <Text>{display}</Text>
        </View>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('infinity', () => Tracking);
