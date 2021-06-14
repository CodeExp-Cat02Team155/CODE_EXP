import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "./ProfileScreen";
import FavoritesScreen from "./FavoriteScreen";
import SearchScreen from "./SearchScreen";

const mainColor = "#0B3454";

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setProfileOpen] = useState(false);
  const user = {
    id: "U0001",
  };

  function Content() {
    if (searchTerm.length == 0) {
      return <FavoritesScreen navigation={navigation} />;
    } else {
      return <SearchScreen navigation={navigation} keyword={searchTerm} />;
    }
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
        <ProfileScreen />
      </Modal>
      <Content />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.bottomToggle}
          onPress={() => setProfileOpen(true)}
        >
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Tap to Search"
        />
        <TouchableOpacity style={styles.bottomToggle}>
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  clearBackground: {
    flex: 1,
  },
});
