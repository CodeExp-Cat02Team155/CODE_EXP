import React, { useState } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Text,
    DeviceEventEmitter,
  } from 'react-native';

export default function HomeScreen() {

    function logout() {
        DeviceEventEmitter.emit("logout")
    }

    return (<SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  