import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function DemoLocation({ addressIds }) {
  const locations = [
    {
      name: "OPPO Concept Store - Jurong Point",
      address:
        "Jurong Point Shopping Centre, Jurong West Central 2, #B1-14/15 Jurong Point, 648886",
    },
    {
      name: "OPPO Concept Store - Causeway Point",
      address:
        "1 Woodlands Square, #03-12 Causeway Point Shopping Center, Singapore 738099",
    },
  ];

  const locationItemArray = [];
  locations.forEach(({ name, address }) =>
    locationItemArray.push(
      <TouchableOpacity
        style={styles.itemContainer}
        key={address}
        onPress={() =>
          WebBrowser.openBrowserAsync(
            "https://www.google.com.sg/maps/search/" + address
          )
        }
      >
        <Text style={styles.itemHeader}>{name}</Text>
        <Text style={styles.itemAddress}>{address}</Text>
      </TouchableOpacity>
    )
  );

  return (
    <View style={{ width: "100%", padding: 20 }}>
      <Text style={styles.header} numberOfLines={1}>
        Available to Try At
      </Text>
      {locationItemArray}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    paddingVertical: 20,
    fontWeight: "700",
  },
  itemHeader: {
    fontSize: 16,
    paddingBottom: 5,
  },
  itemAddress: {
    fontSize: 12,
  },
});
