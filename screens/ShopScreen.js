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

export default function ShopScreen({ navigation, route }) {
  const storeId = route.params.item;
  const store = getStore();
  const products = getProducts();

  const [isFavorite, setFavorite] = useState(checkIfFavorite());

  function checkIfFavorite() {
    return true;
  }

  function getStore() {
    // Fetch store details
    return {
      id: storeId,
      name: "OPPO",
      iconUrl:
        "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
    };
  }

  function getProducts() {
    return [
      {
        type: "product",
        id: "0001",
        name: "OPPO Reno 5 Pro",
        iconUrl:
          "https://laz-img-sg.alicdn.com/p/2af2af5550a6a6f199a7df742e0613ee.jpg_720x720q80.jpg_.webp",
        currentPrice: 819,
        rrp: 899,
      },
    ];
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
