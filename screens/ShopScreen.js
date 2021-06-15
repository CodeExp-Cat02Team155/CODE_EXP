import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductListing from "../listings/ProductListing";
import productList from "../local_data/list_product.json";

export default function ShopScreen({ navigation, route }) {
  const store = route.params.data;
  const products = getProducts(store.id);

  function getProducts(id) {
    return productList.list.filter((product) => product.id === id)[0].products;
  }
  
  const [isFavorite, setFavorite] = useState(checkIfFavorite());

  function checkIfFavorite() {
    return true;
  }

  function exit() {
    navigation.goBack();
  }

  function getColor() {
    if (isFavorite) {
      return "#EC3232";
    }
    return "grey";
  }

  function toggleFavorite() {
    setFavorite(!isFavorite);
  }

  const renderItem = ({ item }) => {
    return <ProductListing item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={exit}>
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>
          <Image source={{ uri: store.iconUrl }} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.header} numberOfLines={1}>
              {store.name}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons name="heart" size={24} color={getColor()} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        fadingEdgeLength={50}
        style={{ paddingTop: 10 }}
        renderItem={renderItem}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    height: 95,
    backgroundColor: "white",
    justifyContent: "flex-end",
    padding: 10,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
  image: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
});
