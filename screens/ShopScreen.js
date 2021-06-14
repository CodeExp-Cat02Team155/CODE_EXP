import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ShopScreen({ navigation, route }) {
  const storeId = route.params.item;
  const store = getStore(storeId);

  function getStore(id) {
    // Fetch store details
    return {
      id: id,
      name: "OPPO",
      iconUrl:
        "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
    };
  }

  function exit() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={exit}>
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>
          <Image source={{ uri: store.iconUrl }} style={styles.image} />
          <Text style={styles.header} numberOfLines={1}>
            {store.name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "flex-end",
    padding: 20,
    elevation: 5,
  },
  header: {
    paddingLeft: 10,
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
