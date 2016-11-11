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
  View,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

let toast = NativeModules.ToastNative;

export default class androidToast extends Component {
  componentWillMount(){
    DeviceEventEmitter.addListener('eventName',(e)=>{
      console.log(e)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>react-native 调用android原生模块</Text>
        <TouchableOpacity onPress={()=>{
          toast.show('Toast message',toast.SHORT,(message,count)=>{console.log("==",message,count)},(message,count)=>{console.log("++",message,count)});
        }}>
          <Text style={styles.btn}>Click Me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title:{
    fontSize:16,
  },
  btn:{
    fontSize:16,
    paddingVertical:7,
    paddingHorizontal:10,
    borderColor:'#f00',
    borderWidth:1,
    borderRadius:5,
    marginTop:10,
    color:'#f00'
  }
});

AppRegistry.registerComponent('androidToast', () => androidToast);
