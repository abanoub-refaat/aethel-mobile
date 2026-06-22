import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artwork } from "../types";

const CACHE_KEY_PREFIX = "@aethel_favorite:";

export async function saveBookmark(artwork: Artwork): Promise<void> {
  try {
    await AsyncStorage.setItem(
      `${CACHE_KEY_PREFIX}${artwork.id}`,
      JSON.stringify(artwork),
    );
  } catch (error) {
    console.error("Failed to bookmark the painting to AsyncStorage:", error);
  }
}

export async function removeBookmark(artworkId: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(`${CACHE_KEY_PREFIX}${artworkId}`);
  } catch (error) {
    console.error(
      "Failed to remove bookmarked pinting to AsyncStorage:",
      error,
    );
  }
}

export async function getBookmarks(): Promise<Artwork[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const favoriteKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
    const items = await AsyncStorage.multiGet(favoriteKeys);
    return items
      .map(([_, value]) => (value ? JSON.parse(value) : null))
      .filter(Boolean) as Artwork[];
  } catch (error) {
    console.error("Faild to get bookmarks:  ", error);
    return [];
  }
}
