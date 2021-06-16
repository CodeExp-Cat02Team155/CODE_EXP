import React from "react";
import {
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mainColor = "#0B3454";

export default function ProfileScreen() {
  function logout() {
    DeviceEventEmitter.emit("logout");
  }

  return (
    <View style={styles.popup}>
      <Text style={styles.header}>{global.email}</Text>
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
    height: 150,
    width: "100%",
    backgroundColor: mainColor,
  },
  header: {
    color: "white",
    fontSize: 20,
  },
  buttonPrimary: {
    backgroundColor: "white",
    height: 40,
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonPrimaryText: {
    color: mainColor,
    fontWeight: "700",
  },
});
