<p align="center">
  <img src="assets/aethel-horizontal-banner.png" alt="Aethel Logo" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
</p>

> **Aethel** _(derived from Old English for noble/excellent)_ is an offline-first mobile application designed for ambient, passive art education. It transforms a smartphone’s most viewed space—the wallpaper—into a curated canvas, rotating through timeless classical masterpieces paired with digestible, human-readable background stories.

---

## Key Features

- **Ambient Wallpaper Engine:** Automatically rotates device wallpapers to public domain classical paintings on a periodic cycle without manual app interaction.
- **Contextual Overlays:** Displays non-intrusive metadata overlays (Title, Artist, Date) alongside a brief, curated backstory explaining the painting's meaning.
- **Interactive Detail Cards:** Tapping the overlay expands into a full-screen, cleanly typeset detail card highlighting the artwork's history.
- **Offline-First Caching:** Utilizes local batch caching to store high-resolution imagery and text, conserving data and ensuring smooth offline availability.
- **Personal Galleries:** Allows users to save and catalog their favorite historical masterpieces into a persistent local collection.

---

## Architecture & Data Ingestion

The client-side architecture directly consumes data from major public cultural databases, abstracting and standardizing payloads locally:

- **The Metropolitan Museum of Art API:** Restricts object queries to open-access imagery collections sorted by historical significance.
- **Art Institute of Chicago API:** Leverages direct endpoint lookups combined with custom IIIF image parameters to request highly optimized resolution scales.

### Tech Stack

- **Mobile Client:** React Native (TypeScript)
- **Local Caching:** AsyncStorage for persistent image reference arrays and metadata strings.

---

## Engineering Roadmap

### Phase 1: Mobile Client Core (Current)

- [ ] Initialize strict TypeScript configuration and component folders.
- [ ] Build the open API ingestion layer and normalize JSON data payloads.
- [ ] Integrate native background task runner hooks for automated device wallpaper injection.
- [ ] Implement the `AsyncStorage` local batch caching architecture.
- [ ] Build out the fluid UI overlay modules and tap-to-expand details screen.

### Phase 2: Web Presence (Upcoming)

- [ ] Build a sleek landing page in **Next.js** showcasing app highlights and interactive mockups.

---

## ⚙️ Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- Android Studio (for Android Emulator) or Xcode (for macOS/iOS Simulator)

### Installation & Execution

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abanoub-refaat/aethel-mobile.git
   cd aethel-mobile
   ```

2. **Install dependencies:**

   ```bash
   npm install
   npx react-native start
   ```

3. **Boot the client:**

- **For iOS (Mac only):**

  ```bash
  npx react-native run-ios
  ```

- **For Android:**

  ```bash
  npx react-native run-android
  ```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
