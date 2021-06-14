import React, { useState, useEffect } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Modal,
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

// dummy value for authentication, to be replaced when switching to authentication from server
const dummyUsername = "admin";
const dummyPassword = "12345";

export default function App() {
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener("logout", () => {
      setLoggedIn(false);
    });
    return () => {
      listener.remove();
    };
  }, []);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  function login() {
    console.log("Login: [" + username + ", " + password + "]");

    setUsername("");
    setPassword("");
    setLoggedIn(true);

    /*
    if (username === dummyUsername && password === dummyPassword)
      setLoggedIn(true);
    else {
      Alert.alert("Authentication Error", "Invalid username / password!");
      console.log(
        "Error: login\n Error Message: username or password is wrong!"
      );
    }
    */
  }

  function createAccount() {
    if (newPassword === newPasswordRepeat) {
      console.log("Create Account: [" + username + ", " + newPassword + "]");

      // Add [username, password1] to database

      resetSignUpScreen();
    } else Alert.alert("Password Error", "The 2 passwords are not the same!");
  }

  function resetSignUpScreen() {
    setPassword("");
    setNewPassword("");
    setNewPasswordRepeat("");
    setDisplaySignUp(false);
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
      <View style={styles.row}>
        <TouchableOpacity onPress={login} style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDisplaySignUp(true)}
          style={styles.buttonSecondary}
        >
          <Text style={styles.buttonSecondaryText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={displaySignUp}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={resetSignUpScreen}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up</Text>
        </View>
        <View style={styles.modalContainer}>
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
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          <View style={styles.row}>
            <Ionicons
              style={styles.icon}
              name={null}
              size={30}
              color={mainColor}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Repeat Password"
              selectionColor="#66F2A86F"
              placeholderTextColor="#AAAAAA"
              value={newPasswordRepeat}
              onChangeText={setNewPasswordRepeat}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={createAccount}
            >
              <Text style={styles.buttonPrimaryText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={resetSignUpScreen}
            >
              <Text style={styles.buttonSecondaryText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: mainColor,
    height: "30%",
    paddingLeft: "10%",
    paddingBottom: 20,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
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
    color: "white",
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
