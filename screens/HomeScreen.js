import React, { useState } from "react";
import {
  DeviceEventEmitter,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

const mainColor = "#0B3454";

export default function HomeScreen({ navigation }) {
  function logout() {
    DeviceEventEmitter.emit("logout");
  }

  const [favStoresId, setFavStoresId] = useState(["0001"]);

  function getStore(id) {
    // Fetch store details
    return {
      id: id,
      name: "OPPO",
      iconUrl:
        "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
    };
  }

  const renderItem = ({ item }) => {
    const data = getStore(item.id);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("shop", { item })}
      >
        <Image source={{ uri: data.iconUrl }} style={styles.itemImage} />
        <Text style={styles.itemText}>{data.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Text style={styles.header}>My Favourite Stores</Text>
      <FlatList
        style={styles.favStoreContainer}
        showsVerticalScrollIndicator={false}
        data={favStoresId}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={logout} style={styles.buttonPrimary}>
        <Text style={styles.buttonPrimaryText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingTop: 50,
    fontSize: 20,
  },
  favStoreContainer: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    width: "90%",
    height: 200,
    borderRadius: 30,
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
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemText: {
    paddingTop: 10,
    fontSize: 16,
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
