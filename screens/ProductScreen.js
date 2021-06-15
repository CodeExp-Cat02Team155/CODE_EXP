import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DemoLocationScreen from "./DemoLocationSceen";
import ProductInfoScreen from "./ProductInfoScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import productList from "../local_data/list_product.json";
import storeList from "../local_data/list_store.json";

const mainColor = "#0B3454";

export default function ProductScreen({ route, navigation }) {
  const productId = route.params;
  const [tab, setTab] = useState("info");

  const product = productList.list.filter(
    (product) => product.id == productId
  )[0];

  const seller = storeList.stores.filter(
    (store) => store.id == product.storeId
  )[0];

  function goBack() {
    navigation.goBack();
  }

  function openStore() {
    navigation.navigate("shop", seller);
  }

  function addToCart() {
    if (productId in global.cart) {
      global.cart[productId]++;
    } else {
      global.cart[productId] = 1;
    }
  }

  function TabView() {
    if (tab == "info") {
      return (
        <View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => setTab("info")}>
              <Text style={styles.tabTextSelected}>Product Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab("where")}>
              <Text style={styles.tabText}>Demo Location</Text>
            </TouchableOpacity>
          </View>
          <ProductInfoScreen
            description={product.description}
            images={product.image}
          />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => setTab("info")}>
            <Text style={styles.tabText}>Product Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab("where")}>
            <Text style={styles.tabTextSelected}>Demo Location</Text>
          </TouchableOpacity>
        </View>
        <DemoLocationScreen />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30, backgroundColor: "white" }}>
      <ScrollView style={styles.scrollView} fadingEdgeLength={20}>
        <Image source={{ uri: product.iconUrl }} style={styles.image} />
        <Text style={styles.header}>{product.name}</Text>
        <Text style={styles.subHeader}>
          ${product.currentPrice} (U.P.{product.rrp})
        </Text>
        <TouchableOpacity style={styles.row} onPress={openStore}>
          <Image source={{ uri: seller.iconUrl }} style={styles.sellerIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sellerText} numberOfLines={1}>
              {seller.name}
            </Text>
          </View>
        </TouchableOpacity>
        <TabView />
      </ScrollView>
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={addToCart}>
          <Text style={styles.buttonSecondaryText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bannerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={goBack}
            style={{ backgroundColor: "#FFFFFF70", borderRadius: 25 }}
          >
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    height: 95,
    justifyContent: "flex-end",
    padding: 10,
    position: "absolute",
    top: 0,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  header: {
    paddingTop: 20,
    fontSize: 30,
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  sellerIcon: {
    marginVertical: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sellerText: {
    fontSize: 20,
    height: 100,
    marginLeft: 10,
    fontWeight: "700",
    textAlignVertical: "center",
  },
  tab: {
    paddingVertical: 15,
    flexDirection: "row",
    backgroundColor: mainColor,
    justifyContent: "space-evenly",
  },
  tabText: {
    fontSize: 16,
    color: "white",
  },
  tabTextSelected: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
  },
  bottomRow: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    borderColor: mainColor,
    borderWidth: 1,
    height: 40,
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonSecondaryText: {
    color: mainColor,
    fontWeight: "700",
  },
});
