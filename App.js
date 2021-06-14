import React, { useState, useEffect } from "react";
import {
  Alert,
  DeviceEventEmitter,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";

const Stack = createStackNavigator();
const mainColor = "#0B3454";

<<<<<<< HEAD
// dummy authentication value, to be changed when switching to authentication
=======
// dummy value for authentication, to be replaced when switching to authentication from server
>>>>>>> 3e5fc95b5b5dac616613bdd19dba193969ae446b
const dummyUsername = "admin";
const dummyPassword = "12345";

export default function App() {
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener("logout", () => {
      setUsername("");
      setPassword("");
      setLoggedIn(false);
    });
    return () => {
      listener.remove();
    };
  }, []);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function authLogin() {
    setLoggedIn(true);

    /*
    if (username === dummyUsername && password === dummyPassword)
      setLoggedIn(true);
    else {
<<<<<<< HEAD
      console.log(
        "Error: login\n Error Message: username or password is wrong!"
      );

      Alert.alert("Authentication Error", "Wrong username / password!");
    }
=======
      Alert.alert("Authentication Error", "Invalid username / password!");
      console.log(
        "Error: login\n Error Message: username or password is wrong!"
      );
    }
    */
>>>>>>> 3e5fc95b5b5dac616613bdd19dba193969ae446b
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="shop" component={ShopScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.row}>
        <Ionicons
          style={styles.icon}
          name={"person-outline"}
          size={30}
          color={mainColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          selectionColor="#66F2A86F"
          placeholderTextColor="#AAAAAA"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.row}>
        <Ionicons
          style={styles.icon}
          name={"lock-open-outline"}
          size={30}
          color={mainColor}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          selectionColor="#66F2A86F"
          placeholderTextColor="#AAAAAA"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity onPress={authLogin} style={styles.buttonPrimary}>
        <Text style={styles.buttonPrimaryText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
  },
  appLogo: {
    width: 70,
    height: 70,
    marginBottom: 50,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginRight: 15,
  },
  header: {
    paddingLeft: 10,
    fontSize: 50,
    color: mainColor,
  },
  input: {
    height: 40,
    width: "70%",
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    color: mainColor,
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
  buttonSecondary: {
    borderColor: mainColor,
    borderWidth: 1,
    height: 40,
    width: 120,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonSecondaryText: {
    color: mainColor,
    fontWeight: "700",
  },
});
