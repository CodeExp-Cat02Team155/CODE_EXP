import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "./ProfileScreen";
import FavoriteScreen from "./FavoriteScreen";
import SearchScreen from "./SearchScreen";

const mainColor = "#0B3454";

export default function HomeScreen({ navigation }) {
  const [searchTerm, _setSearchTerm] = useState("");
  const [isSearching, setSearching] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const userId = "U0001";

  const searchTermRef = useRef(searchTerm);
  const setSearchTerm = (input) => {
    searchTermRef.current = input;
    _setSearchTerm(input);
  };

  useEffect(() => {
    global.cart = new Object();
    global.favStores = [];

    BackHandler.addEventListener("hardwareBackPress", back);
    return () => BackHandler.removeEventListener("hardwareBackPress", back);
  }, []);

  function back() {
    if (navigation.canGoBack() || searchTermRef.current.length == 0)
      return false;

    setSearchTerm("");
    setSearching(false);
    return true;
  }

  function Content() {
    if (searchTerm.length == 0 || isSearching)
      return <FavoriteScreen navigation={navigation} />;
    return <SearchScreen navigation={navigation} keyword={searchTerm} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Modal
        visible={isProfileOpen}
        transparent={true}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={() => setProfileOpen(false)}
      >
        <TouchableOpacity
          onPress={() => setProfileOpen(false)}
          style={styles.clearBackground}
        />
        <ProfileScreen userId={userId} />
      </Modal>
      <Content />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.bottomToggle}
          onPress={() => setProfileOpen(true)}
        >
          <Ionicons name="person" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.searchBarInput}
              value={searchTerm}
              onChangeText={(input) => {
                setSearchTerm(input);
                setSearching(true);
              }}
              onBlur={() => {
                setSearching(false);
              }}
              placeholder="Tap to Search"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setSearchTerm("");
              setSearching(false);
            }}
            style={{
              width: 20,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Ionicons name="close" size={20} color={mainColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.bottomToggle}
          onPress={() => navigation.navigate("qr")}
        >
          <Ionicons name="qr-code" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomToggle: {
    backgroundColor: mainColor,
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  userIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  searchBar: {
    backgroundColor: "white",
    flex: 1,
    height: 40,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchBarInput: {
    paddingLeft: 20,
    paddingRight: 10,
    height: 40,
  },
  clearBackground: {
    flex: 1,
  },
});
