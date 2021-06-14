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

  const handleBarCodeScanned = ({ type, data }) => {
    const code = String(data);
    if (code.startsWith("ProductCode")) {
      setScanned(true);
      navigation.goBack();
      navigation.navigate("product", code.substring("ProductCode".length));
    }
  };

  if (hasPermission === null)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  else if (hasPermission === false)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
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
