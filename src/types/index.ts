export interface Artwork {
  id: string;
  title: string;
  artist: string;
  date: string;
  story: string;
  imageUrl: string;
  medium?: string;
  location?: string;
  dimensions?: string;
  source: "wikimedia" | "met";
  sourceUrl?: string;
  isPublicDomain: boolean;
}
