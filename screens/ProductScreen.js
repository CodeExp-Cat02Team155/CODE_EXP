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

const mainColor = "#0B3454";

export default function ProductScreen({ route, navigation }) {
  const productId = route.params;
  const [tab, setTab] = useState("info");

  const product = {
    id: productId,
    name: "OPPO Reno 5 Pro",
    iconUrl:
      "https://laz-img-sg.alicdn.com/p/2af2af5550a6a6f199a7df742e0613ee.jpg_720x720q80.jpg_.webp",
    currentPrice: 819,
    rrp: 899,
    sellerId: "0001",
  };

  const seller = {
    id: "0001",
    name: "OPPO",
    followers: 65000,
    iconUrl:
      "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
  };

  function openStore() {
    navigation.navigate("shop", { seller });
  }

  function addToCart() {
    if (productId in global.cart) {
      global.cart[productId]++;
    } else {
      global.cart[productId] = 1;
    }
    console.log(global.cart);
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
          <ProductInfoScreen />
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView} fadingEdgeLength={50}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  header: {
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
    backgroundColor: "white",
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
