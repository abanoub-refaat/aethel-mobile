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

const { width } = Dimensions.get("window");

type Props = {
  artwork: Artwork;
};

export default function ArtWorkOverlay({ artwork }: Props) {
  const [isMinimized, setIsMinimized] = useState(true);
  const navigation = useNavigation<ArtworkOverlayNavigation>();

  return (
    <View style={styles.infoCard}>
      {isMinimized && (
        <Pressable
          onPress={() => setIsMinimized(false)}
          style={({ pressed }) => [
            styles.infoButtonRow,
            pressed && styles.pressedFeedback,
          ]}
        >
          <Image
            source={require("../../assets/icons/info-circle-svgrepo-com.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.promptText}>Want to know more?</Text>
        </Pressable>
      )}

      {!isMinimized && (
        <View style={{ padding: 12 }}>
          <View style={styles.expandedHeader}>
            <View style={styles.metaColumn}>
              <Text style={styles.metaText}>
                <Text style={styles.labelBold}>Title: {artwork.title} </Text>
              </Text>
              <Text style={styles.metaText}>
                <Text style={styles.labelBold}>Artist: {artwork.artist} </Text>
              </Text>
              <Text style={styles.metaText}>
                <Text style={styles.labelBold}>Date: {artwork.date} </Text>
              </Text>
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
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.story}>
            {artwork.story.length > 120
              ? artwork.story.substring(0, 120) + "..."
              : artwork.story}
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Details", { artwork })}
            style={({ pressed }) => [
              styles.detailButton,
              pressed && styles.pressedFeedback,
            ]}
          >
            <Text style={styles.detailButtonText}>See Full Details</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: "rgba(253, 251, 247, 0.62)",
    position: "absolute",
    bottom: 30,
    borderRadius: 24,
    width: width * 0.9,
    left: width * 0.05,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  infoButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  expandedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  metaColumn: {
    flex: 1,
    paddingRight: 12,
  },
  closeButton: {
    padding: 4,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: "#2C1B2E",
  },
  promptText: {
    fontSize: 15,
    color: "#4A3B4C",
    fontFamily: "Inter-Medium",
    marginLeft: 8,
  },
  metaText: {
    fontSize: 15,
    color: "#2C1B2E",
    marginBottom: 4,
    fontFamily: "Inter-Regular",
  },
  labelBold: {
    fontWeight: "800",
    fontFamily: "Inter-Bold",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(44, 27, 46, 0.1)",
    marginVertical: 12,
  },
  story: {
    fontSize: 14,
    color: "#4A3B4C",
    fontFamily: "Inter-Light",
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  pressedFeedback: {
    opacity: 0.6,
  },
  detailButton: {
    marginTop: 12,
    backgroundColor: "#4A3B4C",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#f6f4f0",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
