import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import locationList from "../local_data/list_location.json";

export default function DemoLocation({ locationIds }) {
  function getLocation(id) {
    return locationList.list.filter((location) => location.id == id)[0];
  }

  const locationItemArray = [];

  locationIds.forEach((id) => {
    const { name, address } = getLocation(id);
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
    );
  });

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
