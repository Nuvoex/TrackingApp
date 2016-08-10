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





const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
} = MK;

MK.setTheme({
    primaryColor: MKColor.Green,
    accentColor: MKColor.Purple,
});

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
      progress: 0,
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
      console.log("request successful");
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



    var banner;

    if (this.state.status){
      banner = (
        <View>

          <View style={{marginTop:16}}>
            <View style={styles.feature}>
              <Text style={styles.label}>Awb</Text>
              <Text style={styles.bold}>{this.state.awb}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Client</Text>
              <Text style={styles.bold}>{this.state.client_name}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Origin</Text>
              <Text style={styles.bold}>{this.state.origin_city}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Destination</Text>
              <Text style={styles.bold}>{this.state.destination_city}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.bold}>{this.state.location}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Updated At</Text>
              <Text style={styles.bold}>{this.state.updated_at}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.bold}>{this.state.description}</Text>
            </View>
          </View>
          <Text style={{marginTop:16, fontWeight: 'bold'}}>History</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={{padding:8}}>
                <Text style={{fontWeight: 'bold'}} >Description</Text>
                <Text>{rowData.description}</Text>
                <Text style={styles.bold}>Location</Text>
                <Text>{rowData.location}</Text>
                <Text style={styles.bold}>Updated At</Text>
                <Text>{rowData.updated_at}</Text>
              </View>
            }
          />
        </View>
      )
    } else if(this.state.network_error_message){
        banner = (
          <View>
            <Text style={{color: '#F00', padding:16}}>{this.state.network_error_message}</Text>
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



      const ColoredRaisedButton = MKButton.coloredFlatButton()
        .withText('Search')
        .withOnPress(() => {
          console.log("Hi, it's a colored button!");
          this._handlePress();
        })
        .build();

      content = (
        <View>
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
          <Progress.CircleSnail color={['green']} />
        </View>
      )
    }

    return (
     <View style={{flex:1}}>
       <ToolbarAndroid
         style={styles.toolbar}
         titleColor={"#ffffff"}
         title="Track Shipment" />
         <ScrollView>
           <View style={{flex:1}}>
             {content}
           </View>
         </ScrollView>
    </View>

    );
  }
}

var styles = StyleSheet.create({
  toolbar: { backgroundColor: '#0f303e', height: 56, },
  feature: {flexDirection: 'row'},
  bold: {fontWeight: 'bold',flex:0.7},
  label:{flex:0.3,},
});


AppRegistry.registerComponent('infinity', () => Tracking);
