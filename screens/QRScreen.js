import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

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
    if (code.match("^[P, S][0-9]+")) {
      setScanned(true);
      console.log(code);
      navigation.goBack();
      navigation.navigate(code.charAt(0) === "P" ? "product" : "shop", code);
    }
  };

  if (hasPermission === true)
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );

  const displayText =
    hasPermission === null
      ? "Requesting for camera permission"
      : "No access to camera";

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>{displayText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "center",
  },
});
