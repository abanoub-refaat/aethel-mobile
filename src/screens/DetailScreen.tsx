import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { Artwork } from "../types";
import {
  saveBookmark,
  removeBookmark,
  getBookmarks,
} from "../storage/favorites";
import {
  getLikeCount,
  toggleLike,
  getIsLiked,
  setIsLiked,
} from "../storage/likes";
import { useRoute, RouteProp } from "@react-navigation/native";
import { setDeviceWallpaper } from "wallpaper-setter";
type RootStackParamList = {
  Details: { artwork: Artwork };
};

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Details">>();
  const { artwork } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const checkBookmark = async () => {
      const bookmarks = await getBookmarks();
      const alreadyBookmarked = bookmarks.some((b) => b.id === artwork.id);
      setIsFavorite(alreadyBookmarked);
    };
    checkBookmark();

    const loadLikes = async () => {
      const count = await getLikeCount(artwork.id);
      const liked = await getIsLiked(artwork.id);
      setCount(count);
      setIsLoved(liked);
    };
    loadLikes();
  }, []);

  const handleSetWallpaper = async () => {
    setIsSetting(true);
    try {
      const dir = FileSystem.documentDirectory;
      if (!dir) {
        alert("Storage unavailable");
        return;
      }

      const response = await fetch(artwork.imageUrl, {
        headers: {
          "User-Agent":
            "Aethel/1.0 (art education mobile app; https://github.com/abanoub-refaat/aethel-mobile)",
        },
      });
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];
          const fileUri = dir + `aethel_wp_${artwork.id}.jpg`;

          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const success = await setDeviceWallpaper(fileUri);

          if (success) {
            alert("Wallpaper set successfully!");
          } else {
            alert("Failed to apply system wallpaper.");
          }
        } catch (nativeErr) {
          console.error("Native swap crash:", nativeErr);
          alert("Failed to apply system wallpaper.");
        } finally {
          setIsSetting(false);
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Wallpaper process failed: ", error);
      alert("Error caching artwork asset.");
      setIsSetting(false);
    }
  };

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
            uri: artwork.imageUrl,
          }}
          resizeMode="cover"
        />
        <View style={styles.mainHeader}>
          <Text style={styles.title}>
            {artwork.title} ({artwork.date})
          </Text>
          <Text style={styles.artist}>{artwork.artist}</Text>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.loveAction}>
            <Pressable
              onPress={async () => {
                const newCount = await toggleLike(artwork.id, count, isLoved);
                await setIsLiked(artwork.id, !isLoved);
                setCount(newCount);
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
              onPress={async () => {
                if (isFavorite) {
                  await removeBookmark(artwork.id);
                } else {
                  await saveBookmark(artwork);
                }
                setIsFavorite(!isFavorite);
              }}
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
                  if (!isAvailable) {
                    alert("Sharing is not available on this device");
                    return;
                  }
                  const dir = FileSystem.documentDirectory;
                  if (!dir) {
                    alert("Storage unavailable");
                    return;
                  }
                  const response = await fetch(artwork.imageUrl, {
                    headers: {
                      "User-Agent":
                        "Aethel/1.0 (art education mobile app; https://github.com/abanoub-refaat/aethel-mobile)",
                    },
                  });
                  const blob = await response.blob();

                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    const base64 = (reader.result as string).split(",")[1];
                    const fileUri = dir + `aethel_${artwork.id}.jpg`;
                    await FileSystem.writeAsStringAsync(fileUri, base64, {
                      encoding: FileSystem.EncodingType.Base64,
                    });
                    await Sharing.shareAsync(fileUri);
                  };
                  reader.readAsDataURL(blob);
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
                  if (!permission.granted) {
                    alert("Permission denied");
                    return;
                  }
                  const dir = FileSystem.documentDirectory;
                  if (!dir) {
                    alert("Storage unavailable");
                    return;
                  }

                  const response = await fetch(artwork.imageUrl, {
                    headers: {
                      "User-Agent":
                        "Aethel/1.0 (art education mobile app; https://github.com/abanoub-refaat/aethel-mobile)",
                    },
                  });
                  const blob = await response.blob();

                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    const base64 = (reader.result as string).split(",")[1];
                    const fileUri = dir + `aethel_${artwork.id}.jpg`;
                    await FileSystem.writeAsStringAsync(fileUri, base64, {
                      encoding: FileSystem.EncodingType.Base64,
                    });
                    await MediaLibrary.saveToLibraryAsync(fileUri);
                    alert("Saved to gallery!");
                  };
                  reader.readAsDataURL(blob);
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

            <View style={styles.verticalDivider} />

            <Pressable
              onPress={handleSetWallpaper}
              disabled={isSetting}
              style={[styles.favoriteButton, isSetting && { opacity: 0.5 }]}
            >
              <Image
                source={
                  isSetting
                    ? require("../../assets/icons/set-wallpaper-active-wallpaper-svgrep-com.png")
                    : require("../../assets/icons/set-wallpaper-svgrepo-com.png")
                }
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
        <Text style={styles.storyBody}>{artwork.story}</Text>
        <Text style={styles.metaLabel}>Medium</Text>
        <Text style={styles.metaValue}>{artwork.medium}</Text>
        <Text style={styles.metaLabel}>Location</Text>
        <Text style={styles.metaValue}>{artwork.location}</Text>
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
    gap: 53,
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
  verticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(44, 27, 46, 0.15)",
    alignSelf: "center",
    marginHorizontal: 4,
  },
});
