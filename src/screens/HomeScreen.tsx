import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <ImageBackground
      source={{
        uri: "https://images.metmuseum.org/CRDImages/ep/original/DP119115.jpg",
      }}
      resizeMode="cover"
      style={styles.backgroundCanvas}
      onLoadStart={() => {
        setLoading(true);
        setErrorMsg(null);
        console.log("Starting download...");
      }}
      onLoad={() => {
        setLoading(false);
        console.log("Loaded successfully!");
      }}
      onError={(e) => {
        setLoading(false);
        setErrorMsg(e.nativeEvent.error);
        console.log("Native Error:", e.nativeEvent.error);
      }}
    >
      <View style={styles.debugContainer}>
        {loading && <Text style={styles.debugText}>Loading Art asset...</Text>}
        {errorMsg && <Text style={styles.errorText}>Error: {errorMsg}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundCanvas: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C1B2E",
  },
  debugContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  debugText: {
    color: "#fff",
    fontSize: 14,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    fontWeight: "bold",
  },
});
