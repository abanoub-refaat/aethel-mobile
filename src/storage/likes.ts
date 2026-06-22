import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLikeCount(artworkId: string): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem("@aethel_likes");
    const counts = raw ? JSON.parse(raw) : {};
    return counts[artworkId] || 0;
  } catch (error) {
    console.error(
      "Failed to like the painting and save it to AsyncStorage:",
      error,
    );
    return 0;
  }
}

export async function setLikeCount(
  artworkId: string,
  count: number,
): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem("@aethel_likes");
    const counts = raw ? JSON.parse(raw) : {};
    counts[artworkId] = count;
    await AsyncStorage.setItem("@aethel_likes", JSON.stringify(counts));
  } catch (error) {
    console.error("Failed to remove the like from AsyncStorage:", error);
  }
}

export async function toggleLike(
  artworkId: string,
  currentCount: number,
  isLiked: boolean,
): Promise<number> {
  try {
    const newCount = isLiked ? currentCount - 1 : currentCount + 1;
    await setLikeCount(artworkId, newCount);
    return newCount;
  } catch (error) {
    console.error(
      "Failed to toggle like the painting and save it to AsyncStorage:",
      error,
    );
    return 0;
  }
}

export async function getIsLiked(artworkId: string): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem("@aethel_loved");
    const liked = raw ? JSON.parse(raw) : {};
    return liked[artworkId] || false;
  } catch {
    return false;
  }
}

export async function setIsLiked(
  artworkId: string,
  value: boolean,
): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem("@aethel_loved");
    const liked = raw ? JSON.parse(raw) : {};
    liked[artworkId] = value;
    await AsyncStorage.setItem("@aethel_loved", JSON.stringify(liked));
  } catch (error) {
    console.error("Failed to save liked state:", error);
  }
}
