import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  TextInput,
  Button,
  FlatList,
  ScrollView
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class BadInstagramCloneApp extends Component {
  state = {
    scanData: [],
    scanText: '',
  }

  // componentDidMount() {
  //  const reversedata = this.state.scanData.reverse();
  //   console.log(this.state.scanData)
  // }

  handleText(text) {
    this.setState({scanText: text});
  }

  handlebarcode(barcodes){
     let value = barcodes.map(b => {return b.data});
     if(this.state.scanData.includes(value[0])) {
      alert("Same Value")
     }else{
      let joined = value.concat(this.state.scanData);
      this.setState({ scanData: joined})
      console.log(value);
     }
  }

  handleclear(e){
    var array = [...this.state.scanData]; // make a separate copy of the array
    var index = array.indexOf(e.target.value)
    array.shift(index, 1);
    this.setState({scanData: array});
    console.log(array);
  }

  handleAdd(){
    var addjoined = [this.state.scanText].concat(this.state.scanData);
    this.setState({ scanData: addjoined })
    console.log(addjoined);
  }

  _renderItem({item}){
    return <Text style={{fontWeight: 'bold', fontSize: 15}}>{item}</Text>
    }

  _keyExtractor = (item) => item;

  render() {
    const scan = this.state.scanData
    return (
      <View style={styles.container}>
        <View style = {{width:400,height:400}}>
          <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onGoogleVisionBarcodesDetected={( {barcodes} ) => {
                  Vibration.vibrate();
                  this.handlebarcode(barcodes);
                }}
            />
        </View>
        <View style={styles.baritems}>
          <View style={styles.textboxcontainer}>
            <TextInput 
              style = {styles.textbox}
              placeholder = 'Enter barcode'
              onChangeText = {this.handleText.bind(this)}
            />
            <TouchableOpacity
              onPress = {this.handleAdd.bind(this)}
              style={styles.addbutton}
              >
              <Text style={{color: "#fff"}}>Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style = {styles.items}
            data = {scan}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
          {/* <Text>{this.state.scanData}</Text> */}
          <TouchableOpacity 
            onPress = {this.handleclear.bind(this)}
            style={styles.clearbutton}
            >
            <Text style={{color: "#fff"}}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  preview: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height:200,
    width:420
  },
  baritems: {
    justifyContent: 'center',
    width: 350,
    height:220,
    marginLeft:30,
    marginTop: 10
  },
  items:{
    paddingTop:7,
    paddingLeft:7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'blue'
  },
  textboxcontainer:{
    flexDirection: 'row',
    marginBottom:15
  },
  textbox:{
    width:290,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'blue',
    paddingLeft:7,
    marginRight:10
  },
  addbutton:{
    width:50,
    height:52,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 4
  },
  clearbutton:{
    width:100,
    height:52,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 4,
    marginTop: 15
  }
  
});

//AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);