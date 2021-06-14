import React from "react";
import { Button, Text, View } from "react-native";

export default function ShopScreen({ navigation, route }) {
  return (
    <View>
      <Text>Shop Screen</Text>
      <Text>Item from Home Screen</Text>
      <Text>{route.params.item}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
