import { Text, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type Props = {
  message: string;
  visible: boolean;
};

export default function Toast({ message, visible }: Props) {
  const slideY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideY, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideY }], opacity },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "rgba(44, 27, 46, 0.79)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  message: {
    color: "#f6f4f0",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
