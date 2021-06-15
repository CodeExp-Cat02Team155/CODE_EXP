import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StoreListing({ item, navigation }) {
  function getFollowerCount(followers) {
    if (followers >= 1000000) return Math.floor(followers / 1000000) + "M";
    else if (followers >= 1000) return Math.floor(followers / 1000) + "K";
    else return item.fans;
  }

  function openStore() {
    navigation.navigate("shop", item);
  }

  return (
    <View style={styles.listingContainer}>
      <TouchableOpacity style={styles.listingBackground} onPress={openStore}>
        <Image source={{ uri: item.iconUrl }} style={styles.storeIcon} />
        <Text style={styles.storeHeader} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.storeSubHeader} numberOfLines={1}>
          Follows: {getFollowerCount(item.followers)}
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
  storeIcon: {
    width: "100%",
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  storeHeader: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "700",
  },
  storeSubHeader: {
    paddingBottom: 20,
  },
});
