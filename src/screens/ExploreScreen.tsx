import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Artwork } from "../types";
import { ARTWORK_TITLES, fetchArtwork } from "../services/wikipedia";
import ArtworkCard from "../components/ArtworkCard";
import { StatusBar } from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";

export default function ExploreScreen() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [shownTitles, setShownTitles] = useState<string[]>([]);
  const [listExhausted, setListExhausted] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const navigation = useNavigation<any>();

  const fetchMultipleArtworks = async (
    count: number,
    excludeIds: string[] = [],
  ) => {
    const shuffled = [...ARTWORK_TITLES].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count + excludeIds.length);
    const results = await Promise.all(
      selected.map((title) => fetchArtwork(title)),
    );
    return results
      .filter(Boolean)
      .filter((a) => !excludeIds.includes(a!.id)) as Artwork[];
  };

  useEffect(() => {
    const initLoad = async () => {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        setIsOffline(true);
        setLoading(false);
        return;
      }
      const initial = await fetchMultipleArtworks(6);
      setArtworks(initial);
      setLoading(false);
    };
    initLoad();
  }, []);

  const loadMore = async () => {
    if (loadingMore || listExhausted) return;
    setLoadingMore(true);
    const existingIds = artworks.map((a) => a.id);
    const more = await fetchMultipleArtworks(6, existingIds);
    if (more.length === 0) {
      setListExhausted(true);
    } else {
      setArtworks((prev) => [...prev, ...more]);
    }
    setLoadingMore(false);
  };

  if (loading)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );

  if (isOffline)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.exhaustedTitle}>You're offline</Text>
        <Text style={styles.exhaustedSubtitle}>
          Check your Favorites for saved paintings — they're available without
          internet.
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ padding: 18 }}>
        <Text style={styles.screenTitle}>EXPLORE</Text>
        <Text style={styles.mainHeader}>Discover Masterpieces</Text>
        <Text style={styles.subtitle}>
          A curated archive of public domain art.
        </Text>
      </View>

      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        data={artworks}
        renderItem={({ item }) => (
          <ArtworkCard
            artwork={item}
            onPress={() => navigation.navigate("Details", { artwork: item })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
        ListFooterComponent={
          listExhausted ? (
            <View style={styles.exhaustedContainer}>
              <Text style={styles.exhaustedTitle}>You've seen it all!</Text>
              <Text style={styles.exhaustedSubtitle}>
                More masterpieces are coming in the next update.
              </Text>
            </View>
          ) : loadingMore ? (
            <Text style={styles.loadingText}>Loading more...</Text>
          ) : null
        }
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
  subtitle: {
    fontSize: 14,
    color: "#63385b",
    marginBottom: 16,
    fontFamily: "Inter-Regular",
  },
  screenTitle: {
    fontSize: 24,
    letterSpacing: 2,
    color: "#63385b",
    fontFamily: "Inter-Bold",
  },
  mainHeader: {
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 42,
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
  loadingMoreText: {
    fontSize: 16,
    color: "#63385b",
    letterSpacing: 1,
    justifyContent: "center",
    textTransform: "uppercase",
    fontFamily: "Inter-Regular",
  },
  exhaustedContainer: {
    padding: 24,
    alignItems: "center",
  },
  exhaustedTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C1B2E",
    marginBottom: 8,
  },
  exhaustedSubtitle: {
    fontSize: 13,
    color: "#63385b",
    textAlign: "center",
    lineHeight: 20,
  },
});
