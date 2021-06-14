import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  DeviceEventEmitter,
} from "react-native";

const mainColor = "#0B3454";

export default function ProfileScreen() {
  function logout() {
    DeviceEventEmitter.emit("logout");
  }

  return (
    <View style={styles.popup}>
      <TouchableOpacity onPress={logout} style={styles.buttonPrimary}>
        <Text style={styles.buttonPrimaryText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  popup: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    height: 330,
    width: "100%",
    backgroundColor: "white",
  },
  buttonPrimary: {
    backgroundColor: mainColor,
    height: 40,
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonPrimaryText: {
    color: "white",
    fontWeight: "700",
  },
});
