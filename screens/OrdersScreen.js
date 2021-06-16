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
import productList from "../local_data/list_product.json";

export default function OrdersScreen({ navigation }) {
  const orderIds = ["0001"];

  function openProduct(id) {
    navigation.navigate("product", id);
  }

  const renderItem = ({ item }) => {
    const order = {
      id: item,
      productId: "001",
      date: Date.now(),
    };
    const product = productList.list.filter(
      (product) => product.id == order.productId
    )[0];

    const dateSplit = Date(order.date).toString().split(" ");
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
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
        <View style={styles.centeredRow}>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryText}>Contact Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Check Status</Text>
          </TouchableOpacity>
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
          keyExtractor={(item) => item}
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
    height: 200,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    justifyContent: "space-between",
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
  centeredRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  quantityIcon: {
    paddingRight: 20,
  },
  quantityText: {
    paddingRight: 20,
    fontSize: 20,
  },
  buttonPrimary: {
    backgroundColor: "#FCFCFC",
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
  },
  buttonPrimaryText: {
    color: "black",
  },
  buttonSecondary: {
    backgroundColor: "#F9F9F9",
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 10,
  },
  buttonSecondaryText: {
    color: "black",
  },
});
