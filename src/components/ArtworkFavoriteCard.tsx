import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Artwork } from "../types";

interface Props {
  artwork: Artwork;
  onPress: () => void;
  onDelete: () => void;
}

export default function ArtworkFavoriteCard({
  artwork,
  onPress,
  onDelete,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
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
        <View>
          <Text style={styles.text}>{artwork.title}</Text>
          <Text style={styles.subtext}>{artwork.artist}</Text>
          <Text style={styles.subtext}>{artwork.date}</Text>
        </View>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={styles.deleteButton}
        >
          <Image
            source={require("../../assets/icons/delete-svgrepo-com.png")}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 4,
    backgroundColor: "rgba(253, 251, 247, 0.79)",
    borderRadius: 18,
    overflow: "hidden",
  },
  typography: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
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
  image: {
    width: 110,
    height: 110,
    borderRadius: 14,
  },
  deleteButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
