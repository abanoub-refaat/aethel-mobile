import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateArtStory } from "./ai";

const CACHE_KEY_PREFIX = "@aethel_story:";

const ARTWORK_TITLES = [
  "The_Night_Watch.jpg",
  "Girl_with_a_Pearl_Earring.jpg",
  "Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "The_Scream.jpg",
  "Las_Meninas.jpg",
  "Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
  "Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  "Leonardo_da_Vinci_-_Mona_Lisa_-_Google_Art_Project.jpg",
  "Sandro_Botticelli_-_La_Nascita_di_Venere_-_Google_Art_Project.jpg",
  "Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg",
  "James_Abbott_McNeill_Whistler_-_Whistler's_Mother_-_Google_Art_Project.jpg",
  "Edouard_Manet_-_A_Bar_at_the_Folies-Bergere_-_Google_Art_Project.jpg",
  "Katsushika_Hokusai_-_Under_the_Wave_off_Kanagawa_-_Google_Art_Project.jpg",
  "Diego_Velazquez_-_The_Surrender_of_Breda_-_Google_Art_Project.jpg",
  "Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog_-_Google_Art_Project.jpg",
];

const randomArtworkPicker = function (artworkTitles: Array<string>) {
  const n = artworkTitles.length;
  return artworkTitles[Math.floor(Math.random() * n)];
};

const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const extractYear = (dateStr: string): string => {
  const match = dateStr.match(/\d{4}/);
  return match ? match[0] : dateStr;
};

const cleanTitle = (rawTitle: string): string => {
  return rawTitle
    .replace("File:", "")
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .trim();
};

const getEnglishDescription = (raw: string): string => {
  const stripped = stripHtml(raw);
  const enMatch = stripped.match(/(?:^|\ben:\s*)([A-Z][^.]+\.)/);
  return enMatch ? enMatch[1] : stripped;
};

const fetchArtwork = async (title: string) => {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${title}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Aethel/1.0 (art education mobile app; https://github.com/abanoub-refaat/aethel-mobile)",
      },
    });

    const text = await response.text();
    const data = JSON.parse(text);
    const pages = data.query.pages;

    const page = Object.values(pages)[0] as any;
    if (!page.imageinfo) {
      console.log("Artwork not found:", title);
      return null;
    }
    const imageInfo = page.imageinfo[0];
    const rawUrl: string = imageInfo.url;
    const urlParts = rawUrl.split("/commons/");
    const filePath = urlParts[1];
    const filename = rawUrl.split("/").pop();
    const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${filePath}/1280px-${filename}`;
    const meta = imageInfo.extmetadata;

    const artwork = {
      id: page.pageid.toString(),
      title: cleanTitle(page.title),
      artist: stripHtml(meta.Artist?.value || "Unknown Artist"),
      date: extractYear(
        stripHtml(meta.DateTimeOriginal?.value || meta.Date?.value || ""),
      ),
      story: getEnglishDescription(
        meta.ImageDescription?.value || "No description available.",
      ),
      imageUrl: imageUrl,
      medium: stripHtml(meta.Medium?.value || ""),
      location: stripHtml(meta.Credit?.value || ""),
      isPublicDomain: true,
      source: "wikimedia" as const,
    };

    try {
      const cacheKey = `${CACHE_KEY_PREFIX}${artwork.id}`;
      const cachedStory = await AsyncStorage.getItem(cacheKey);

      if (cachedStory) {
        artwork.story = cachedStory;
      } else {
        const aiStory = await generateArtStory(artwork as any);
        await AsyncStorage.setItem(cacheKey, aiStory);
        artwork.story = aiStory;
      }
    } catch (cacheError) {
      console.log(
        "Storage/AI pipeline failed, falling back to original meta:",
        cacheError,
      );
    }

    return artwork;
  } catch (error) {
    console.log("Fetch error:", error);
    return null;
  }
};

export { fetchArtwork, randomArtworkPicker, ARTWORK_TITLES };
