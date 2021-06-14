import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const mainColor = "#0B3454"
const categories = [{
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
    colorBackground: "#F9F6D6"
},
{
    id: 3,
    name: "More",
    icon: "apps",
    color: "#11A01B",
    colorBackground: "#D2EFD7"
},]

export default function HomeScreen({ navigation }) {

    const [isProfileOpen, setProfileOpen] = useState(false)
    const [favStoresId, setFavStoresId] = useState(["0001"]);
    const user = {
        id: "U0001",
        icon: "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/60338958_2385453971699436_4792821904744382464_n.png?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=fQEALJ_s-KAAX8gcPMr&_nc_ht=scontent.fsin9-2.fna&oh=7ae79db0a4dd620b73387047ddeb22a2&oe=60CB2E4B"

    }

    function getStore(id) {
        // Fetch store details
        return {
            id: id,
            name: "OPPO",
            iconUrl: "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51"
        }
    }

    const storeRenderItem = ({item}) => {
        const data = getStore(item.id)
        return (<TouchableOpacity style={styles.itemContainer}
            onPress={() => navigation.navigate("shop", { item })}>
            <Image source={{uri: data.iconUrl}}
                style={styles.itemImage}/>
            <Text style={styles.itemText}
                numberOfLines={1}>{data.name}</Text>
        </TouchableOpacity>)
    }

    const categoryRendermItem = ({item}) => {
        return (<TouchableOpacity style={styles.itemContainer}>
            <View style={styles.icon}
                backgroundColor={item.colorBackground}>
                <Ionicons name={item.icon} size={25} color={item.color}/>
            </View>
            <Text style={styles.itemText}
                numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <Modal visible={isProfileOpen}
                statusBarTranslucent={true}
                onRequestClose={() => setProfileOpen(false)}>

            </Modal>
            <Text style={styles.header}>AppName</Text>
            <FlatList style={styles.favStoreContainer}
                showsVerticalScrollIndicator={false}
                data={favStoresId}
                numColumns={4}
                keyExtractor={(item) => item.id}
                renderItem={storeRenderItem}/>
            <View style={{height: 100, marginTop: 20}}>
                <FlatList style={styles.categoriesContainer}
                    showsVerticalScrollIndicator={false}
                    data={categories}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    renderItem={categoryRendermItem}/>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.bottomToggle}
                    onPress={() => setProfileOpen(true)}>
                    <Image source={{uri: user.icon}}
                        style={styles.userIcon}/>
                </TouchableOpacity>
                <TextInput style={styles.searchBar}
                    placeholder="Tap to Search"/>
                <TouchableOpacity style={styles.bottomToggle}>
                    <Ionicons name="qr-code" size={20} color="white"/>
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
    header: {
        paddingTop: 40,
        fontSize: 20,
        paddingLeft: 30,
        paddingRight: 30,
        width: "100%",
    },
    row: {
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    favStoreContainer: {
        elevation: 1,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        width: "90%",
        height: 200,
        borderRadius: 20,
        backgroundColor: "white",
    },
    categoriesContainer: {
        elevation: 1,
        marginLeft: 30,
        marginRight: 30,
        width: "90%",
        height: 100,
        borderRadius: 20,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToggle: {
        backgroundColor: mainColor,
        height: 40,
        width: 40,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    userIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
    },
    searchBar: {
        backgroundColor: 'white',
        flex: 1,
        height: 40,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
    }
});
