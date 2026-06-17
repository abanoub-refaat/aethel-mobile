import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import ArtWorkOverlay from "./src/components/ArtworkOverlay";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <ArtWorkOverlay />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
