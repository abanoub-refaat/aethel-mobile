import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateArtStory } from "./ai";
import { Artwork } from "../types";

const CACHE_KEY_PREFIX = "@aethel_story:";

const ARTWORK_TITLES = [
  "The_Night_Watch.jpg",
  "Girl_with_a_Pearl_Earring.jpg",
  "Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "The_Scream.jpg",
  "Las_Meninas.jpg",
  "Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
  "Tsunami_by_hokusai_19th_century.jpg",
  "Velazquez-The_Surrender_of_Breda.jpg",
  "Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
  "Death_of_the_Virgin-Caravaggio_(1606).jpg",
  "The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg",
  "Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
  "Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg",
  "Rembrandt_Harmensz._van_Rijn_-_The_Abduction_of_Europa_-_Google_Art_Project.jpg",
  "Johannes_Vermeer_-_Gezicht_op_huizen_in_Delft,_bekend_als_'Het_straatje'_-_Google_Art_Project.jpg",
  "View_of_Delft,_by_Johannes_Vermeer.jpg",
  "La_Liberté_guidant_le_peuple_-_Eugène_Delacroix_-_Musée_du_Louvre_Peintures_RF_129_-_après_restauration_2024.jpg",
  "Death_of_Marat_by_David.jpg",
  "Bartolomeo_Cavarozzi_-_Virgin_and_Child_with_Angels_-_Google_Art_Project.jpg",
  "El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
  "Vincent_van_Gogh_-_Windmills_on_Montmartre_-_Google_Art_Project.jpg",
  "Vincent_Willem_van_Gogh_037.jpg",
  "Van_Gogh_The_Olive_Trees..jpg",
  "Renoir,_Pierre-Auguste_-_Dance_at_Le_Moulin_de_la_Galette,_1876.jpg",
  "Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg",
  "Caspar_David_Friedrich_-_View_of_a_harbour.png",
  "The_Mocking_of_Christ_(van_Dyck).jpg",
  "Caspar_David_Friedrich_-_Woman_before_the_Rising_Sun_(Woman_before_the_Setting_Sun)_-_WGA08253.jpg",
  "The_Love_Letter_-_Johannes_Vermeer.png",
  "Rembrandt_Harmensz._van_Rijn_-_Jeremia_treurend_over_de_verwoesting_van_Jeruzalem_-_Google_Art_Project.jpg",
  "Descent_from_the_Cross_(Rembrant).jpg",
  "Christ_in_the_Wilderness_-_Ivan_Kramskoy_-_Google_Cultural_Institute.jpg",
  "Van_Gogh_-_Terrace_of_a_Café_at_Night_(Place_du_Forum)_1888.jpg",
  "Caravaggio,_Michelangelo_Merisi_da_-_The_Calling_of_Saint_Matthew_-_1599-1600_(hi_res).jpg",
  "Jacob_Wrestling_with_the_Angel.jpg",
  "Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
  "Manuel_Domínguez_Sánchez_-_El_suicidio_de_Séneca.jpg",
  "Iván_el_Terrible_y_su_hijo,_por_Iliá_Repin.jpg",
  `"Le_dernier_soupir_du_Christ",_Julien_Michel_Gué,_1840._(35186172350).jpg`,
  "The_Wounded_Angel_-_Hugo_Simberg.jpg",
  "Toulmouche_Bride.jpg",
  "Leighton-God_Speed!.jpg",
  "Accolade_by_Edmund_Blair_Leighton.jpg",
  "Frank_Bernard_Dicksee_(1853-1928)_-_La_belle_dame_sans_merci_-_K328_-_Bristol_City_Museum_^_Art_Gallery.jpg",
  "Vasily_Pukirev_-_Неравный_брак_-_Google_Art_Project.jpg",
  "Ophelia_(1847-48),_by_Henri_Lehmann.jpg",
  `The_Two_Central_Figures_in_"Derby_Day"_-_William_Powell_Frith.jpg`,
  "William_Holman_Hunt_-_The_Awakening_Conscience_-_Google_Art_Project.jpg",
  "Joean_Honoré_Fragonard_-_The_Swing.jpg",
  "Gabriël_Metsu_-_The_Triumph_of_Justice_-_95_-_Mauritshuis.jpg",
  "Carlo_Dolci_(Florence_1616-86)_-_Salome_with_the_Head_of_John_the_Baptist_-_RCIN_405639_-_Royal_Collection.jpg",
  "13_Estancia_de_Heliodoro_(Liberación_de_San_Pedro).jpg",
  "Raphael_-_The_Sistine_Madonna_-_Google_Arts_%26_Culture.jpg",
  "Botticelli-primavera.jpg",
  "Leonardo_da_Vinci_(1452-1519)_-_The_Last_Supper_(1495-1498).jpg",
  "Bacchus_by_Caravaggio_1.jpg",
  "Michelangelo_Merisi,_called_Caravaggio_-_Saint_John_the_Baptist_in_the_Wilderness_-_Google_Art_Project.jpg",
  "The_Entombment_of_Christ-Caravaggio_(c.1602-3).jpg",
  "Duomo_(Verona)_-_Cartolari-Nichesola_Chapel_-_L'assunzione_del_Tiziano.jpg",
  "Rembrandt_Harmensz._van_Rijn_-_Portret_van_een_paar_als_oudtestamentische_figuren,_genaamd_'Het_Joodse_bruidje'_-_Google_Art_Project.jpg",
  "Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
  "Rembrandt_-_De_Staalmeesters-_het_college_van_staalmeesters_(waardijns)_van_het_Amsterdamse_lakenbereidersgilde_-_Google_Art_Project.jpg",
  "Vermeer,_Johannes_-_Woman_reading_a_letter_-_ca._1662-1663.jpg",
  "Johannes_Vermeer_-_Lady_at_the_Virginal_with_a_Gentleman,_'The_Music_Lesson'_-_Google_Art_Project.jpg",
  "Woman_writing_a_letter,_with_her_maid,_by_Johannes_Vermeer.jpg",
  "Johannes_Vermeer_-_The_lacemaker_(c.1669-1671).jpg",
  "Johannes_Vermeer,_Allegory_of_the_Catholic_Faith,_The_Metropolitan_Museum_of_Art.jpg",
  "Jan_Brueghel_de_Oude_en_Peter_Paul_Rubens_-_Het_aards_paradijs_met_de_zondeval_van_Adam_en_Eva.jpg",
  "Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
  "Artemisia_Gentileschi_-_Judith_Beheading_Holofernes_-_WGA8563.jpg",
  "Self-Portrait_as_Saint_Catherine_of_Alexandria_(Gentileschi).jpg",
  "Jean_Honore_Fragonard_The_Love_Letter.jpg",
  "Image-Jean-Honoré_Fragonard_018.jpg",
  "Jean-Honoré_Fragonard_-_The_Bolt_-_WGA8080.jpg",
  "Madame_de_Pompadour.jpg",
  "Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg",
  "Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg",
  "Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg",
  "El_coloso.jpg",
  "Francisco_de_Goya_y_Lucientes_-_Witches_Sabbath_-_Google_Art_Project.jpg",
  "JEAN_LOUIS_THÉODORE_GÉRICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
  "Eugène_Delacroix_-_The_Women_of_Algiers,_1834.jpg",
  "Eugène_Delacroix_-_Chasse_au_tigre_(1854).jpg",
  "Eugène_Delacroix_-_The_Barque_of_Dante.jpg",
  "Edouard_Manet,_A_Bar_at_the_Folies-Bergère.jpg",
  "Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg",
  "Edgar_Degas_-_In_a_Café_-_Google_Art_Project_2.jpg",
  "VanGogh-Irises_3.jpg",
  "Van_Gogh_Self-Portrait_with_Straw_Hat_1887-Detroit.jpg",
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

const fetchMulipleArtworks = async (count: number) => {
  const shuffled = [...ARTWORK_TITLES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  const results = await Promise.all(
    selected.map((title) => fetchArtwork(title)),
  );
  return results.filter(Boolean) as Artwork[];
};

export {
  fetchArtwork,
  randomArtworkPicker,
  fetchMulipleArtworks,
  ARTWORK_TITLES,
};
