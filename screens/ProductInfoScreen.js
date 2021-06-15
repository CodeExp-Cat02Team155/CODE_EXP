import React from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import Image from "react-native-scalable-image";

export default function ProductInfoScreen({ description, images }) {
  const imageArray = [];

  for (let i = 0; i < images.length; i++) {
    imageArray.push(
      <Image
        key={images[i]}
        source={{ uri: images[i] }}
        width={Dimensions.get("screen").width}
      />
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.header}>About Product</Text>
        <Text>{description}</Text>
      </View>
      {imageArray}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    paddingVertical: 20,
    fontWeight: "700",
  },
});
