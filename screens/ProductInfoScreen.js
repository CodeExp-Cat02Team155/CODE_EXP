import React from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import Image from "react-native-scalable-image";

export default function ProductInfoScreen() {
  const description =
    "Display Size: 6.55‘’ FHD+ AMOLED Screen\n64MP HD Rear Camera\nBattery capacity：4350mAh Battery\nSIM Card Type: Nano Dual-Sim\nMediatek Dimensity 1000+\nFingerprint Sensor & AI Face Unlock\nRAM：12GB RAM + 256GB ROM\nColorOS 11.1 Based on Android 11";

  const images = [
    "https://sg-test-11.slatic.net/shop/b80af49a0c71e551bdcb7aa910a2ae86.jpeg_2200x2200q80.jpg_.webp",
  ];

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
