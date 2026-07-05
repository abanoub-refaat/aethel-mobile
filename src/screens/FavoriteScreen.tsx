import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Artwork } from "../types";
import { getBookmarks, removeBookmark } from "../storage/favorites";
import ArtworkFavoriteCard from "../components/ArtworkFavoriteCard";
import { StatusBar } from "expo-status-bar";

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        setLoading(true);
        const data = await getBookmarks();
        setFavorites(data);
        setLoading(false);
      };
      loadFavorites();
    }, []),
  );

  if (loading)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  if (favorites.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={{ padding: 18 }}>
          <Text style={styles.screenTitle}>FAVORITES</Text>
          <Text style={styles.mainHeader}>Your Personal Gallery</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/icons/favorite-logo-icon.png")}
            style={styles.emptyIcon}
          />

          <Text style={styles.subtitle}>
            Your personal gallery is empty. Explore the archive and bookmark
            masterpieces to build your collection offline.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 18 }}>
        <Text style={styles.screenTitle}>FAVORITES</Text>
        <Text style={styles.mainHeader}>Your Personal Gallery</Text>
      </View>

      <FlatList
        numColumns={1}
        data={favorites}
        renderItem={({ item }) => (
          <ArtworkFavoriteCard
            artwork={item}
            onPress={() => navigation.navigate("Details", { artwork: item })}
            onDelete={async () => {
              await removeBookmark(item.id);
              setFavorites((prev) => prev.filter((f) => f.id !== item.id));
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f4f0",
    padding: 12,
  },
  screenTitle: {
    fontSize: 24,
    color: "#63385b",
    fontFamily: "Inter-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 8,
  },
  mainHeader: {
    fontSize: 48,
    fontWeight: "800",
    color: "#2C1B2E",
    marginBottom: 4,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 14,
    color: "#2C1B2E",
    marginTop: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    width: 80,
    height: 80,
    opacity: 0.2,
    marginBottom: 20,
    tintColor: "#2C1B2E",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f6f4f0",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#63385b",
    letterSpacing: 2,
    textTransform: "uppercase",
    fontFamily: "Inter-Regular",
  },
});
