import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function QRScreen({ navigation }) {
  const [hasPermission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    const code = String(data);
    if (code.startsWith("ProductCode")) {
      setScanned(true);
      navigation.goBack();
      navigation.navigate("product", code.substring("ProductCode".length));
    }
  };

  function goBack() {
    navigation.goBack();
  }

  if (hasPermission === true)
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.bannerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={goBack}
              style={{ backgroundColor: "#FFFFFF70", borderRadius: 25 }}
            >
              <Ionicons name="arrow-back" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

  const displayText =
    hasPermission === null
      ? "Requesting for camera permission"
      : "No access to camera";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>{displayText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContainer: {
    width: "100%",
    height: 95,
    justifyContent: "flex-end",
    padding: 10,
    position: "absolute",
    top: 0,
  },
});
