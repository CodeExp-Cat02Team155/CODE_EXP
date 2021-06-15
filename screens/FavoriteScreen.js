import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import storeList from "../local_data/list_store.json";

export default function FavoriteScreen({ navigation }) {
  const [favStoresId, setFavStoresId] = useState(["S0004", "S0001", "S0002"]);

  function getStore(id) {
    return storeList.stores.filter((store) => store.id === id)[0];
  }

  const menu = [
    {
      id: 0,
      name: "My Cart",
      icon: "cart-outline",
      colorBackground: "#EC3232",
      action: () => {
        navigation.navigate("cart");
      },
    },
    {
      id: 1,
      name: "My Orders",
      icon: "document-text-outline",
      colorBackground: "#448AEA",
      action: () => {
        navigation.navigate("orders");
      },
    },
    {
      id: 2,
      name: "Message",
      icon: "chatbubbles-outline",
      colorBackground: "#4BBD4D",
      action: () => {},
    },
    {
      id: 3,
      name: "More",
      icon: "grid-outline",
      colorBackground: "#FBC72B",
      action: () => {},
    },
  ];

  const storeRenderItem = ({ item }) => {
    const data = getStore(item);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("shop", { data })}
      >
        <Image source={{ uri: data.iconUrl }} style={styles.itemImage} />
        <Text style={styles.itemText} numberOfLines={1}>
          {data.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const menuRendermItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={item.action}>
        <View style={styles.icon} backgroundColor={item.colorBackground}>
          <Ionicons name={item.icon} size={25} color="white" />
        </View>
        <Text style={styles.itemText} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
      <Text style={styles.header}>Dashboard</Text>
      <FlatList
        style={styles.favStoreContainer}
        showsVerticalScrollIndicator={false}
        data={favStoresId}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={storeRenderItem}
      />
      <View style={{ height: 100, marginTop: 20 }}>
        <FlatList
          style={styles.menuContainer}
          showsVerticalScrollIndicator={false}
          data={menu}
          numColumns={4}
          keyExtractor={(item) => item.id}
          renderItem={menuRendermItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    fontSize: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    width: "100%",
  },
  favStoreContainer: {
    elevation: 1,
    marginTop: 20,
    width: "90%",
    height: 200,
    borderRadius: 20,
    backgroundColor: "white",
  },
  menuContainer: {
    elevation: 1,
    width: "90%",
    height: 100,
    borderRadius: 20,
    backgroundColor: "white",
  },
  itemContainer: {
    width: "25%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemText: {
    paddingTop: 5,
    fontSize: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
