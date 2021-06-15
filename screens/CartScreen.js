import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function CartScreen() {
  const [cart, setCart] = useState(getData());

  function reduceCount(id) {
    global.cart[id]--;
    setCart(getData());
  }

  function increaseCount(id) {
    global.cart[id]++;
    setCart(getData());
  }

  function getData() {
    const tempCart = [];
    const keys = Object.keys(global.cart);
    const values = Object.values(global.cart);
    for (let i = 0; i < keys.length; i++) {
      if (values[i] < 1) {
        continue;
      }
      tempCart.push({
        id: keys[i],
        quantity: values[i],
      });
    }
    return tempCart;
  }

  const renderItem = ({ item }) => {
    const product = {
      id: "0001",
      name: "OPPO Reno 5 Pro",
      iconUrl:
        "https://laz-img-sg.alicdn.com/p/2af2af5550a6a6f199a7df742e0613ee.jpg_720x720q80.jpg_.webp",
      currentPrice: 819,
      rrp: 899,
    };
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: product.iconUrl }} style={styles.itemImage} />
        <Text style={styles.itemHeader}>{product.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={styles.header}>My Cart</Text>
      <FlatList data={cart} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    fontSize: 30,
    paddingBottom: 30,
  },
  itemHeader: {
    fontSize: 20,
    padding: 10,
  },
  itemContainer: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },
  itemImage: {
    borderRadius: 10,
    width: 120,
    height: 120,
  },
});
