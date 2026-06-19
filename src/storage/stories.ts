import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY_PREFIX = "@aethel_story:";

export async function getCachedStory(
  artworkId: string,
): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(`${CACHE_KEY_PREFIX}${artworkId}`);
  } catch (error) {
    console.error("Failed to read story from AsyncStorage:", error);
    return null;
  }
}

export async function cacheStory(
  artworkId: string,
  story: string,
): Promise<void> {
  try {
    await AsyncStorage.setItem(`${CACHE_KEY_PREFIX}${artworkId}`, story);
  } catch (error) {
    console.error("Failed to save story to AsyncStorage:", error);
  }
}
