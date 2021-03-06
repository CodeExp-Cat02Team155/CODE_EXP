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
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-easy-toast";
import productList from "../local_data/list_product.json";

const mainColor = "#0B3454";

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState(getData());
  var toast;

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

  function openProduct(id) {
    navigation.navigate("product", id);
  }

  function checkOut() {
    if (getData().length < 1) {
      toast.show("Cart is empty");
      return;
    }
    navigation.navigate("payment");
  }

  const renderItem = ({ item }) => {
    const product = productList.list.filter(
      (product) => product.id == item.id
    )[0];

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => openProduct(item.id)}>
          <Image source={{ uri: product.iconUrl }} style={styles.itemImage} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.itemHeader}>
            {product.name}
          </Text>
          <Text style={styles.itemSubHeader} numberOfLines={1}>
            ${product.currentPrice}
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.quantityIcon}
              onPress={() => reduceCount(item.id)}
            >
              <Ionicons name="remove-circle-outline" size={26} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityIcon}
              onPress={() => increaseCount(item.id)}
            >
              <Ionicons name="add-circle-outline" size={26} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 50 }}
    >
      <Toast ref={(_toast) => (toast = _toast)} />
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>My Cart</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={checkOut}>
          <Text style={styles.buttonPrimaryText}>Check Out</Text>
        </TouchableOpacity>
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
    paddingTop: 15,
    padding: 10,
  },
  itemSubHeader: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemContainer: {
    width: "100%",
    height: 120,
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
