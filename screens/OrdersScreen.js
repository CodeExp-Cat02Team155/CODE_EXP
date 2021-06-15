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

const mainColor = "#0B3454";

export default function OrdersScreen({ navigation }) {
  const orderIds = ["0001"];

  function openProduct(id) {
    navigation.navigate("product", id);
  }

  const renderItem = ({ item }) => {
    const order = {
      id: item,
      productId: "0001",
      date: Date.now(),
    };
    const product = {
      id: order.productId,
      name: "OPPO Reno 5 Pro",
      iconUrl:
        "https://laz-img-sg.alicdn.com/p/2af2af5550a6a6f199a7df742e0613ee.jpg_720x720q80.jpg_.webp",
      currentPrice: 819,
      rrp: 899,
    };
    const dateSplit = Date(order.date).toString().split(" ");
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => openProduct(product.id)}>
          <Image source={{ uri: product.iconUrl }} style={styles.itemImage} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              paddingTop: 15,
              paddingHorizontal: 10,
              paddingBottom: 5,
              color: "grey",
            }}
            numberOfLines={1}
          >
            Order #{order.id}
          </Text>
          <Text numberOfLines={1} style={styles.itemHeader}>
            {product.name}
          </Text>
          <Text style={styles.itemSubHeader} numberOfLines={1}>
            {dateSplit[2]} {dateSplit[1]} {dateSplit[3]}
          </Text>
          <Text style={styles.itemSubHeader} numberOfLines={1}>
            ${product.currentPrice}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 50 }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>My Orders</Text>
        <FlatList
          data={orderIds}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    paddingBottom: 30,
  },
  itemHeader: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  itemSubHeader: {
    fontSize: 16,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 10,
  },
  itemImage: {
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  quantityIcon: {
    paddingRight: 20,
  },
  quantityText: {
    paddingRight: 20,
    fontSize: 20,
  },
  buttonPrimary: {
    backgroundColor: mainColor,
    height: 40,
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonPrimaryText: {
    color: "white",
    fontWeight: "700",
  },
});
