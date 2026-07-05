<p align="center">
  <img src="assets/aethel-horizontal-banner.png" alt="Aethel Logo" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
</p>

> **Aethel** *(derived from Old English for noble/excellent)* is an offline-first mobile application designed for ambient, passive art education. It transforms a smartphone’s most viewed space—the wallpaper—into a curated canvas, rotating through timeless classical masterpieces paired with digestible, AI-generated blog-style stories.


## 🏛️ Key Features

- **Ambient Wallpaper Engine (Upcoming):** Programmatic backdrop rotation using a native device background task loop runner.
- **Floating Interaction Zone:** A minimalist interface that hides metadata behind a floating `info` icon, maximizing screen real estate for unhindered artwork viewing.
- **Centered Editorial Modals:** Tapping the info icon reveals a centered glassmorphic overlay (`rgba(253, 251, 247, 0.92)`) featuring title, artist, date, and an AI-generated story snippet.
- **Deep-Dive Blogs:** Smooth transition to full-screen structured details, displaying full-length essays, medium, location, and interactive tools.
- **Offline-First Storage:** Local media and layout tracking via `AsyncStorage` ensuring saved paintings are completely viewable offline.
- **Personal Galleries:** Grid-based multi-threaded explore view paired with an instantaneous-refresh favorites list layout.
- **Social Utilities:** Integrated on-device high-resolution asset downloads (`expo-media-library`) and native share sheets (`expo-sharing`).


## 🛠️ Architecture & Data Ingestion

The app utilizes a centralized, lightweight, self-contained architecture executing directly on the client over native network bridges:

- **Wikimedia Commons API:** Serves as the high-resolution open-access source image library. Queries use custom scale dimensions (1280px) to maximize visual clarity while preventing device memory crashes.
- **Groq Cloud API Layer:** Leverages **Llama 3.3 70B Versatile** to construct high-quality art history stories completely on-the-fly, cached strictly using unique artwork identifiers.

### Tech Stack

- **Mobile Client:** React Native with Expo (Managed Continuous Native Generation workflow)
- **Language:** TypeScript
- **Caching Layer:** `@react-native-async-storage/async-storage` for story collections, favorite records, and user like maps.
- **Navigation:** React Navigation (Stack Navigator nested inside a label-free Bottom Tab Navigator)


## 📋 Engineering Roadmap

### Phase 1: Mobile Client Core & Screens
- [x] Create three-part staggered splash screen logo animations.
- [x] Configure self-remedying random picture fetch algorithms with a 10-attempt loop safeguard.
- [x] Build out the hidden floating info action triggers and centered metadata overlays.
- [x] Implement full details view handling image aspect containers, sharing sheets, and device image downloads.

### Phase 2: Navigation & Multi-Threading
- [x] Establish nested Stack and Tab layouts using custom asset-driven iconography state changes.
- [x] Program multi-threaded parallel asset fetching (`Promise.all`) for high-speed catalog compiling.
- [x] Design asymmetric grid components and landscape horizontal favorite cards.

### Phase 3 & 4: Caching, Storage, and Favorites Curation
- [x] Build multi-key storage abstractions for data persistency across user device reboots.
- [x] Integrate real-time state listeners for dynamic deletions on personal gallery arrays.

### Phase 5: Wallpaper Engine & Customization (Current)
- [ ] Connect `expo-task-manager` and `expo-background-fetch` for headless background thread task loops.
- [ ] Wire up native Android `WallpaperManager` bindings via custom Expo config plugins.
- [ ] Build user customization options panel to control wallpaper cycle frequencies.


## ⚙️ Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- Android device connected via USB with Debugging enabled (tested on Fedora Linux)

### Installation & Execution

1. **Clone the repository:**
```bash
   git clone [https://github.com/abanoub-refaat/aethel-mobile.git](https://github.com/abanoub-refaat/aethel-mobile.git)
   cd aethel-mobile

```

2. **Configure Environment Variables:**
Create a `.env` file in the root directory:

```env
   GROQ_API_KEY=your_groq_developer_api_key_here

```

3. **Install dependencies:**

```bash
   npm install

```

4. **Compile and Run Native Android Dev Build:**

```bash
   npx expo prebuild --clean
   npx expo run:android

```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
