import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function ProductListing({ item, navigation }) {
  function openProduct() {
    navigation.navigate("product", item.id);
  }

  return (
    <View style={styles.listingContainer}>
      <TouchableOpacity style={styles.listingBackground} onPress={openProduct}>
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
    fontSize: 16,
  },
  productSubHeader: {
    paddingBottom: 20,
    color: "grey",
  },
});
