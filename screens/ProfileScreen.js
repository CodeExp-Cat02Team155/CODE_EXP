import React from "react";
import {
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mainColor = "#0B3454";

export default function ProfileScreen({ userId }) {
  const user = getUser();

  function getUser() {
    return {
      email: "abc123@gmail.com",
    };
  }

  function logout() {
    DeviceEventEmitter.emit("logout");
  }

  return (
    <View style={styles.popup}>
      <Text style={styles.header}>{user.email}</Text>
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
    height: 200,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
  },
  buttonPrimary: {
    backgroundColor: mainColor,
    height: 40,
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonPrimaryText: {
    color: "white",
    fontWeight: "700",
  },
});
