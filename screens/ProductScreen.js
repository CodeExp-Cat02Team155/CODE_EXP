import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function ProductScreen({ route, navigation }) {
  const productId = route.params;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{productId}</Text>
    </SafeAreaView>
  );
}
