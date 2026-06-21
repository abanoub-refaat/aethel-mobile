import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Artwork } from "../types";

type ArtworkOverlayNavigation = {
  navigate: (screen: "Details", params: { artwork: Artwork }) => void;
};

const { width, height } = Dimensions.get("window");

type Props = {
  artwork: Artwork;
};

export default function ArtWorkOverlay({ artwork }: Props) {
  const [isMinimized, setIsMinimized] = useState(true);
  const navigation = useNavigation<ArtworkOverlayNavigation>();

  if (isMinimized) {
    return (
      <Pressable
        onPress={() => setIsMinimized(false)}
        style={({ pressed }) => [
          styles.floatingInfoButton,
          pressed && styles.pressedFeedback,
        ]}
      >
        <Image
          source={require("../../assets/icons/details-circle-svgrepo-com.png")}
          style={styles.infoIcon}
          resizeMode="contain"
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.fullscreenDismissContainer}>
      <Pressable
        style={styles.absoluteDismiss}
        onPress={() => setIsMinimized(true)}
      />

      <View style={styles.infoCard}>
        <View style={{ padding: 12 }}>
          <View style={styles.expandedHeader}>
            <View style={styles.metaColumn}>
              <Text style={styles.artworkTitle}>{artwork.title}</Text>
              <Text style={styles.artworkArtist}>{artwork.artist}</Text>
              <Text style={styles.artworkDate}>{artwork.date}</Text>
            </View>

            <Pressable
              onPress={() => setIsMinimized(true)}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressedFeedback,
              ]}
            >
              <Image
                source={require("../../assets/icons/close-circle-svgrepo-com.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.story}>
            {artwork.story.length > 160
              ? artwork.story.substring(0, 260) + " ..."
              : artwork.story}
          </Text>

          <Pressable
            onPress={() => {
              setIsMinimized(true);
              navigation.navigate("Details", { artwork });
            }}
            style={({ pressed }) => [
              styles.detailButton,
              pressed && styles.pressedFeedback,
            ]}
          >
            <Text style={styles.detailButtonText}>
              Read More Detailed Blog →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingInfoButton: {
    position: "absolute",
    right: 20,
    top: 100,
    backgroundColor: "rgba(253, 251, 247, 0.79)",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(44, 27, 46, 0.08)",
  },
  infoIcon: {
    width: 20,
    height: 20,
    tintColor: "#2C1B2E",
  },
  fullscreenDismissContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  absoluteDismiss: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  infoCard: {
    backgroundColor: "rgba(253, 251, 247, 0.79)",
    borderRadius: 26,
    width: width * 0.86,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(2C, 1B, 2E, 0.05)",
  },
  expandedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  metaColumn: {
    flex: 1,
    paddingRight: 8,
  },
  artworkTitle: {
    fontSize: 20,
    color: "#2C1B2E",
    fontWeight: "800",
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  artworkArtist: {
    fontSize: 15,
    color: "#4A3B4C",
    fontFamily: "Inter-Medium",
    marginBottom: 2,
  },
  artworkDate: {
    fontSize: 13,
    color: "#63385b",
    fontFamily: "Inter-Regular",
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(44, 27, 46, 0.08)",
    marginVertical: 14,
  },
  story: {
    fontSize: 14,
    color: "#4A3B4C",
    fontFamily: "Inter-Light",
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  pressedFeedback: {
    opacity: 0.7,
  },
  detailButton: {
    marginTop: 18,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  detailButtonText: {
    color: "#4A3B4C",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontFamily: "Inter-Bold",
  },
});
