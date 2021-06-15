import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mainColor = "#0B3454";

export default function PaymentScreen({ navigation }) {
  function completePayment() {
    const keys = Object.keys(global.cart);
    keys.forEach((key) => {
      delete global.cart[key];
    });
    navigation.navigate("home");
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TouchableOpacity style={styles.buttonPrimary} onPress={completePayment}>
        <Text style={styles.buttonPrimaryText}>Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: "700",
    paddingBottom: 30,
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
