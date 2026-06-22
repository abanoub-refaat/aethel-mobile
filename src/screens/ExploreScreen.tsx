import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Artwork } from "../types";
import { fetchMulipleArtworks } from "../services/wikipedia";
import ArtworkCard from "../components/ArtworkCard";

export default function ExploreScreen() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchMulipleArtworks(14).then((data) => {
      setArtworks(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 18 }}>
        <Text style={styles.screenTitle}>EXPLORE</Text>
        <Text style={styles.mainHeader}>Discover Masterpieces</Text>
        <Text style={styles.subtitle}>
          A curated archive of public domain art.
        </Text>
      </View>

      <FlatList
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
    color: "#63385b",
    fontFamily: "Inter-Bold",
  },
  mainHeader: {
    fontSize: 48,
    fontFamily: "Inter-Extra-Bold",
  },
});
