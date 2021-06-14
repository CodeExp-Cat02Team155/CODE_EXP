import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  DeviceEventEmitter,
  View,
  Image,
} from "react-native";

export default function HomeScreen() {
    function logout() {
        DeviceEventEmitter.emit("logout");
    }

    const [favStoresId, setFavStoresId] = useState(["0001"])

    function getStore(id) {
        // Fetch store details
        return {
            id: id,
            name: "OPPO",
            iconUrl: "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51"
        }
    }

    const renderItem = ({item}) => {
        const data = getStore(item.id)
        return (<TouchableOpacity style={styles.itemContainer}>
            <Image source={{uri: data.iconUrl}}
                style={styles.itemImage}/>
            <Text style={styles.itemText}>{data.name}</Text>
        </TouchableOpacity>)
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
        />
        <FlatList style={styles.favStoreContainer}
            data={favStoresId}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}/>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  favStoreContainer: {
      marginTop: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});
