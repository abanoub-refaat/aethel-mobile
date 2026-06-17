import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ImageBackground
      source={{
        uri: "https://images.metmuseum.org/CRDImages/ep/web-large/DP119115.jpg",
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
      <View style={styles.topActionContainer}>
        <Pressable
          onPress={() => setIsFavorite(!isFavorite)}
          style={({ pressed }) => [
            styles.favoriteButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Image
            source={
              isFavorite
                ? require("../../assets/icons/favorite-filled-svgrepo-com.png")
                : require("../../assets/icons/favorite-svgrepo-com.png")
            }
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {loading || errorMsg ? (
        <View style={styles.debugContainer}>
          {loading && (
            <Text style={styles.debugText}>Loading Art asset...</Text>
          )}
          {errorMsg && <Text style={styles.errorText}>Error: {errorMsg}</Text>}
        </View>
      ) : null}
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
  topActionContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  favoriteButton: {
    backgroundColor: "rgba(253, 251, 247, 0.8)",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
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
