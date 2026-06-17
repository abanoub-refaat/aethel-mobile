import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function ArtWorkOverlay() {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.metaText}>
        <Text style={styles.labelBold}>Title:The Harvesters</Text>
      </Text>
      <Text style={styles.metaText}>
        <Text style={styles.labelBold}>Artist:Pieter Bruegel the Elder</Text>
      </Text>
      <Text style={styles.metaText}>
        <Text style={styles.labelBold}>Date:1565</Text>
      </Text>

      <View style={styles.divider} />

      <Text style={styles.story}>
        One of six surviving panels commissioned to depict the seasons, this
        masterpiece captures Flemish peasants resting beneath a pear tree during
        the August wheat harvest — a rare, humanizing glimpse of ordinary rural
        life in Renaissance art.
      </Text>
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
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
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
});
