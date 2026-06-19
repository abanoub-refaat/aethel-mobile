const ARTWORK_TITLES = [
  "The_Night_Watch.jpg",
  "Girl_with_a_Pearl_Earring.jpg",
  "Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "The_Scream.jpg",
  "Las_Meninas.jpg",
  "Wanderer_above_the_sea_of_fog.jpg",
  "Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
  "Jan_van_Eyck_-_Arnolfini_Portrait.jpg",
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
      source: "wikimedia",
    };

    return artwork;
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

export { fetchArtwork, randomArtworkPicker, ARTWORK_TITLES };
