import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function StoreListing({ item, navigation }) {
  return (
    <View style={styles.listingContainer}>
      <TouchableOpacity style={styles.listingBackground}>
        <Image source={{ uri: item.iconUrl }} style={styles.productIcon} />
        <Text style={styles.productHeader} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productSubHeader} numberOfLines={1}>
          ${item.currentPrice} (U.P.{item.rrp})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listingContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  listingBackground: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  productIcon: {
    width: "100%",
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
  },
  productSubHeader: {
    paddingBottom: 20,
  },
});
