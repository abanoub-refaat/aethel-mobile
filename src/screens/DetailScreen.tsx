import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";

export default function DetailScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topActionContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.favoriteButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Image
            source={require("../../assets/icons/close-circle-svgrepo-com.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={styles.mainInfoSection}>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.metmuseum.org/CRDImages/ep/web-large/DP119115.jpg",
          }}
        />
        <View style={styles.mainHeader}>
          <Text style={styles.title}>The Harvesters (1565)</Text>
          <Text style={styles.artist}>Pieter Bruegel the Elder</Text>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.loveAction}>
            <Pressable
              onPress={() => {
                if (isLoved) {
                  setCount(count - 1);
                } else {
                  setCount(count + 1);
                }
                setIsLoved(!isLoved);
              }}
              style={({ pressed }) => [
                styles.favoriteButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Image
                source={
                  isLoved
                    ? require("../../assets/icons/love-filled-svgrepo-com.png")
                    : require("../../assets/icons/love-svgrepo-com.png")
                }
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.counter}>{count}</Text>
          </View>
          <View style={styles.actions}>
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
                    ? require("../../assets/icons/bookmark-filled-svgrepo-com.png")
                    : require("../../assets/icons/bookmark-svgrepo-com.png")
                }
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              onPress={async () => {
                try {
                  const isAvailable = await Sharing.isAvailableAsync();
                  console.log("Sharing available:", isAvailable);
                  if (!isAvailable) {
                    alert("Sharing is not available on this device");
                    return;
                  }
                  // Download first, then share the local file
                  const fileUri =
                    (FileSystem as any).documentDirectory + "share_artwork.jpg";
                  await FileSystem.downloadAsync(
                    "https://images.metmuseum.org/CRDImages/ep/web-large/DP119115.jpg",
                    fileUri,
                  );
                  await Sharing.shareAsync(fileUri);
                } catch (e) {
                  console.log("Share error:", e);
                }
              }}
              style={styles.favoriteButton}
            >
              <Image
                source={require("../../assets/icons/share-svgrepo-com.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              onPress={async () => {
                try {
                  const permission =
                    await MediaLibrary.requestPermissionsAsync();
                  console.log("Permission:", permission.granted);
                  if (!permission.granted) {
                    alert("Permission denied");
                    return;
                  }
                  const fileUri = FileSystem.documentDirectory + "artwork.jpg";
                  console.log("Downloading to:", fileUri);
                  const download = await FileSystem.downloadAsync(
                    "https://images.metmuseum.org/CRDImages/ep/web-large/DP119115.jpg",
                    fileUri,
                  );
                  console.log("Download result:", download.status);
                  await MediaLibrary.saveToLibraryAsync(download.uri);
                  alert("Saved to gallery!");
                } catch (e) {
                  console.log("Download error:", e);
                }
              }}
              style={styles.favoriteButton}
            >
              <Image
                source={require("../../assets/icons/download-svgrepo-com.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <ScrollView style={styles.details}>
        <Text style={styles.storyLabel}>The Story Behined This Artwork: </Text>
        <View style={styles.divider} />
        <Text style={styles.storyBody}>
          One of six surviving panels commissioned to depict the seasons, this
          masterpiece captures Flemish peasants resting beneath a pear tree
          during the August wheat harvest — a rare, humanizing glimpse of
          ordinary rural life in Renaissance art.
        </Text>
        <Text style={styles.metaLabel}>Medium</Text>
        <Text style={styles.metaValue}>Oil on wood</Text>
        <Text style={styles.metaLabel}>Location</Text>
        <Text style={styles.metaValue}>
          The Metropolitan Museum of Art, New York
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f4f0",
    padding: 20,
    gap: 10,
  },
  image: {
    borderRadius: 24,
    width: 350,
    height: 300,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 100,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  details: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 5,
  },
  topActionContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
  },
  icon: {
    width: 28,
    height: 28,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  loveAction: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(44, 27, 46, 0.1)",
    marginVertical: 8,
  },
  counter: {
    fontSize: 18,
  },
  mainHeader: {
    gap: 5,
    padding: 5,
  },
  title: {
    fontSize: 24,
    marginTop: 8,
    fontWeight: 800,
    fontFamily: "Inter-Medium",
  },
  artist: {
    color: "#63385b",
    marginTop: -8,
  },
  mainInfoSection: {
    width: "100%",
  },
  storyLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#63385b",
    marginBottom: 8,
    marginTop: 4,
  },
  storyBody: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4a3a47",
    marginBottom: 20,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2C1B2E",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 12,
  },
  metaValue: {
    fontSize: 14,
    color: "#63385b",
  },
});
