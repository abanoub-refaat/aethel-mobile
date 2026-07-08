import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artwork } from "../types";

const LAST_SEEN_KEY = "@aethel_last_seen";

export async function saveLastSeen(artwork: Artwork): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_SEEN_KEY, JSON.stringify(artwork));
  } catch (error) {
    console.error("Failed to save last seen:", error);
  }
}

export async function getLastSeen(): Promise<Artwork | null> {
  try {
    const raw = await AsyncStorage.getItem(LAST_SEEN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Artwork;
  } catch (error) {
    console.error("Failed to get last seen:", error);
    return null;
  }
}
