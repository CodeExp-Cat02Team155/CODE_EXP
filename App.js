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
  Image,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-easy-toast";
import firebase from "firebase/app";
import auth from "firebase/auth";

import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import QRScreen from "./screens/QRScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrdersScreen from "./screens/OrdersScreen";

const Stack = createStackNavigator();
const mainColor = "#0B3454";

if (firebase.apps.length === 0)
  firebase.initializeApp({
    apiKey: "AIzaSyBj7z_OcbMHqTs_Wi9ArMYnENW2OfH4ST0",
    authDomain: "codeexp2021.firebaseapp.com",
    databaseURL: "https://codeexp2021-default-rtdb.firebaseio.com",
    projectId: "codeexp2021",
    storageBucket: "codeexp2021.appspot.com",
    messagingSenderId: "1021334246721",
    appId: "1:1021334246721:web:fddc4f6d41715274443dc0",
    measurementId: "G-HKK92WHSWN",
  });

export default function App() {
  var toast;
  var firebaseAuth = firebase.auth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener("logout", () => {
      firebaseAuth.signOut();
      setLoggedIn(false);
    });
    return () => listener.remove();
  }, []);

  firebaseAuth.onAuthStateChanged((user) => {
    if (user != null) {
      global.userId = user.uid;
      global.email = user.email;
      setEmail("");
      setPassword("");
      setLoggedIn(true);
    } else global.userId = null;

    setLoggedIn(user != null);
  });

  function login() {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => toast.show(error.message));
  }

  function createAccount() {
    if (email.length < 1) Alert.alert("Error: Email", "Email cannot be empty!");
    else if (newPassword.length < 8 || newPasswordRepeat.length < 8)
      Alert.alert("Error: Password", "Password must be at least 8 characters!");
    else if (newPassword != newPasswordRepeat)
      Alert.alert("Error: Password", "The 2 passwords are not the same!");
    else
      firebaseAuth
        .createUserWithEmailAndPassword(email, newPassword)
        .then(() => {
          toast.show("Account created");
          resetSignUpScreen();
        })
        .catch((error) => Alert.alert("Error: Sign Up", error.message));
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
          <Stack.Screen name="qr" component={QRScreen} />
          <Stack.Screen name="product" component={ProductScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
          <Stack.Screen name="payment" component={PaymentScreen} />
          <Stack.Screen name="orders" component={OrdersScreen} />
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
      <Image
        style={{
          width: 300,
          height: 110,
          resizeMode: "contain",
          marginBottom: 20,
        }}
        source={require("./assets/hybrid_text.png")}
      />
      <Input
        iconName="mail-outline"
        placeholder="Email"
        value={email}
        setValue={setEmail}
        secure={false}
      />
      <Input
        iconName="lock-open-outline"
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secure={true}
      />
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
          <Input
            iconName="mail-outline"
            placeholder="Email"
            value={email}
            setValue={setEmail}
            secure={false}
          />
          <Input
            iconName="lock-open-outline"
            placeholder="Password"
            value={newPassword}
            setValue={setNewPassword}
            secure={true}
          />
          <Input
            iconName=""
            placeholder="Repeat Password"
            value={newPasswordRepeat}
            setValue={setNewPasswordRepeat}
            secure={true}
          />
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
      <Toast ref={(t) => (toast = t)} />
    </SafeAreaView>
  );
}

function Input(props) {
  return (
    <View style={styles.row}>
      <Ionicons
        style={styles.icon}
        name={props.iconName}
        size={30}
        color={mainColor}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={props.secure}
        placeholder={props.placeholder}
        selectionColor="#66F2A86F"
        placeholderTextColor="#AAAAAA"
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
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
