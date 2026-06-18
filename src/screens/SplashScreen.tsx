import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const iconSlideX = useRef(new Animated.Value(200)).current;
  const nameSlideY = useRef(new Animated.Value(30)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const subtextSlideX = useRef(new Animated.Value(-30)).current;
  const subtextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(iconSlideX, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(nameSlideY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(nameOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(subtextSlideX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(subtextOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(onFinish, 800);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.splash}>
        <Animated.Image
          source={require("../../assets/logo-splash-icon-0.png")}
          style={[styles.icon, { transform: [{ translateX: iconSlideX }] }]}
        />
        <View style={styles.splashText}>
          <Animated.Image
            source={require("../../assets/logo-splash-name-1.png")}
            style={[
              styles.splashName,
              { transform: [{ translateY: nameSlideY }], opacity: nameOpacity },
            ]}
          />
          <Animated.Image
            source={require("../../assets/logo-splash-subtext-2.png")}
            style={[
              styles.splashSubtext,
              {
                transform: [{ translateX: subtextSlideX }],
                opacity: subtextOpacity,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f4f0",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    width: 80,
    height: 80,
  },
  splashName: {
    width: 160,
    height: 35,
    marginLeft: -45,
  },
  splash: {
    flexDirection: "row",
    alignItems: "center",
  },
  splashText: {
    flexDirection: "column",
    justifyContent: "center",
  },
  splashSubtext: {
    width: 200,
    height: 40,
    marginLeft: -55,
    marginTop: -40,
  },
});
