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
  NativeModules,
  NativeAppEventEmitter
} from 'react-native';

let CalendarManager = NativeModules.CalendarManager;
let subscription;

export default class iosModule extends Component {

  componentWillMount(){
    subscription = NativeAppEventEmitter.addListener(
      'EventReminder',
      (reminder) => console.log(reminder.name)
    );
    console.log(CalendarManager.YEAR);
    CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey',(error, message) => {
      if (error) {
        console.error(error);
      } else {
        console.log("message:",message)
      }
    });
  }

  componentWillUnmount(){
    if(subscription) subscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('iosModule', () => iosModule);
