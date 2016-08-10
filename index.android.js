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
import { Card } from 'react-native-material-design';
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
      //;
      var history=[];
      for (var i = 0; i < responseJson[0].history.length; i++) {
          history.push({
              position:i,
              data:responseJson[0].history[i],
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



    var banner;

    if (this.state.status){
      banner = (
        <View>
        <Card>
          <View style={{marginTop:16}}>
            <View style={styles.feature}>
              <Text style={styles.label}>Reached At</Text>
              <Text style={styles.bold}>{this.state.location}</Text>
            </View>
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
              <Text style={styles.label}>Updated At</Text>
              <Text style={styles.bold}>{this.state.updated_at}</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.bold}>{this.state.description}</Text>
            </View>
          </View>
          </Card>
          <Text style={{marginLeft:8, marginTop:10, fontSize: 12, fontWeight: '500'}}>HISTORY</Text>
          <Card style={{paddingTop:8}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>{
                var topLineStyle;
                topLineStyle=styles.blank_top_line;
                // if(rowData.position===0){
                //
                // }else{
                //     topLineStyle=styles.top_line;
                // }
                return (
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <View style={topLineStyle}/>
                            <View style={styles.circle}/>
                            <View style={styles.line}/>
                        </View>
                        <View style={{flex:1,paddingLeft:8,paddingBottom:12}}>
                          <View style={styles.history_item}>
                            <Text style={styles.label}>Description</Text>
                            <Text style={styles.bold}>{rowData.data.description}</Text>
                          </View>
                          <View style={styles.history_item}>
                            <Text style={styles.label}>Location</Text>
                            <Text style={styles.bold}>{rowData.data.location}</Text>
                          </View>
                          <View style={styles.history_item}>
                            <Text style={styles.label}>Updated At</Text>
                            <Text style={styles.bold}>{rowData.data.updated_at}</Text>
                          </View>
                        </View>
                  </View>
                );
            }}
          />
          </Card>
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
            <View style={{flex:1}}>
              <TextInput style={{margin:8}} keyboardType="numeric" placeholder="Enter Shipment ID" onChangeText={(shipment_id) => this.setState({shipment_id})} />
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
  feature: {flexDirection: 'row',paddingBottom:8,},
  history_item: {flexDirection: 'row',paddingBottom:4,},
  bold: {flex:0.7,},
  label:{flex:0.3,fontWeight: 'bold',},
  circle:{width:10,height:10,borderRadius:5,backgroundColor:'transparent',borderColor:'grey',borderWidth:2},
  line:{backgroundColor:'grey',width:1,flex:1,marginLeft:4,marginTop:4,marginBottom:4},
  top_line:{backgroundColor:'grey',width:1,height:5,marginLeft:4},
  blank_top_line:{backgroundColor:'white',width:1,height:5,marginLeft:4},
});


AppRegistry.registerComponent('infinity', () => Tracking);
