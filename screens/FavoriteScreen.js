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

const categories = [
  {
    id: 0,
    name: "Fashion",
    icon: "shirt",
    color: "#E81E1E",
    colorBackground: "#F2D3CD",
  },
  {
    id: 1,
    name: "Electronics",
    icon: "desktop-outline",
    color: "#22A1E5",
    colorBackground: "#DCE9F2",
  },
  {
    id: 2,
    name: "Tools",
    icon: "construct",
    color: "#F2D11A",
    colorBackground: "#F9F6D6",
  },
  {
    id: 3,
    name: "More",
    icon: "apps",
    color: "#11A01B",
    colorBackground: "#D2EFD7",
  },
];

export default function FavoriteScreen({ navigation }) {
  const [favStoresId, setFavStoresId] = useState(["S0001"]);

  function getStore(id) {
    // Fetch store details
    return {
      id: id,
      name: "OPPO",
      followers: 65000,
      iconUrl:
        "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
    };
  }

  const storeRenderItem = ({ item }) => {
    const data = getStore(item.id);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("shop", { item })}
      >
        <Image source={{ uri: data.iconUrl }} style={styles.itemImage} />
        <Text style={styles.itemText} numberOfLines={1}>
          {data.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const categoryRendermItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.icon} backgroundColor={item.colorBackground}>
          <Ionicons name={item.icon} size={25} color={item.color} />
        </View>
        <Text style={styles.itemText} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
      <Text style={styles.header}>AppName</Text>
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
          style={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
          data={categories}
          numColumns={4}
          keyExtractor={(item) => item.id}
          renderItem={categoryRendermItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    fontSize: 20,
    paddingLeft: 30,
    paddingRight: 30,
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
  categoriesContainer: {
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
