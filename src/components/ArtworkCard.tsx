import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Artwork } from "../types";

interface Props {
  artwork: Artwork;
  onPress: () => void;
}

export default function ArtworkCard({ artwork, onPress }: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <Image
          source={{
            uri: artwork.imageUrl,
            headers: {
              "User-Agent":
                "Aethel/1.0 (art education mobile app; https://github.com/abanoub-refaat/aethel-mobile)",
            },
          }}
          style={styles.image}
        />

        <View style={styles.typography}>
          <Text style={styles.text}>{artwork.title}</Text>
          <Text style={styles.subtext}>{artwork.artist}</Text>
          <Text style={styles.subtext}>{artwork.date}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: "rgba(253, 251, 247, 0.79)",
    borderRadius: 18,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    borderBlockColor: "#63385b",
  },
  typography: {
    padding: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2C1B2E",
  },
  subtext: {
    fontSize: 11,
    color: "#63385b",
    marginTop: 2,
  },
});
