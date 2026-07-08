import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import SplashScreen from "./src/screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        )}
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
