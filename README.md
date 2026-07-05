<p align="center">
  <img src="assets/aethel-horizontal-banner.png" alt="Aethel Logo" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
</p>

> **Aethel** *(derived from Old English for noble/excellent)* is an offline-first mobile application designed for ambient, passive art education. It transforms a smartphone's most viewed space—the wallpaper—into a curated canvas, rotating through timeless classical masterpieces paired with digestible, AI-generated blog-style stories.

---

## 📲 Download

**Latest Release: v1.0.0**

[⬇️ Download APK](https://github.com/abanoub-refaat/aethel-mobile/releases/tag/v1.0.0)

> Enable **"Install from unknown sources"** on your Android device before installing.

---

## 🏛️ Key Features

- **Ambient Wallpaper Engine:** Set any classical masterpiece as your device wallpaper directly from the app with one tap, powered by a custom native Kotlin module.
- **Floating Interaction Zone:** A minimalist interface that hides metadata behind a floating info icon, maximizing screen real estate for unhindered artwork viewing.
- **Centered Editorial Modals:** Tapping the info icon reveals a centered glassmorphic overlay featuring title, artist, date, and an AI-generated story snippet.
- **Deep-Dive Blogs:** Smooth transition to a full-screen details view displaying full-length AI-generated essays, medium, location, and interactive social tools.
- **Explore Gallery:** A multi-threaded parallel asset fetching grid that compiles a curated catalog of classical masterpieces for browsing.
- **Personal Favorites:** An instantaneous-refresh favorites list with horizontal card layout and one-tap removal.
- **Persistent Storage:** Like counts, bookmarks, and AI stories are all cached locally via AsyncStorage ensuring a fully offline experience.
- **Social Utilities:** Integrated on-device high-resolution asset downloads, native share sheets, and love/like counters.
- **Toast Notifications:** Custom animated toast system replacing native alerts for a polished in-app feedback experience.

---

## 🛠️ Architecture & Data Ingestion

The app utilizes a centralized, lightweight, self-contained architecture executing directly on the client over native network bridges:

- **Wikimedia Commons API:** Serves as the high-resolution open-access source image library. Queries use custom scale dimensions (1280px) to maximize visual clarity while preventing device memory crashes. All requests include a custom `User-Agent` header for compliance with Wikimedia's access policies.
- **Groq Cloud API Layer:** Leverages **Llama 3.3 70B Versatile** to construct high-quality art history stories completely on-the-fly, cached strictly using unique artwork identifiers in AsyncStorage to avoid redundant API calls.
- **Custom Native Kotlin Module (`wallpaper-setter`):** A local Expo native module that bridges React Native to Android's `WallpaperManager` API, enabling direct device wallpaper injection from within the app.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile Client | React Native with Expo (Bare/Prebuild Workflow) |
| Language | TypeScript |
| Navigation | React Navigation (Stack + Bottom Tab Navigator) |
| AI Story Generation | Groq API — Llama 3.3 70B Versatile |
| Data Source | Wikimedia Commons API |
| Caching | AsyncStorage (stories, favorites, likes) |
| Native Module | Custom Kotlin Expo Module (wallpaper-setter) |
| File System | expo-file-system (legacy) |
| Media | expo-media-library, expo-sharing |

---

## 📋 Engineering Roadmap

### Phase 1: Mobile Client Core & Screens ✅
- [x] Three-part staggered splash screen logo animation
- [x] Self-remedying random artwork fetch with 10-attempt loop safeguard
- [x] Floating info button and centered glassmorphic metadata overlay
- [x] Full details view with sharing, downloading, and social actions

### Phase 2: Navigation & Multi-Threading ✅
- [x] Nested Stack and Tab layouts with custom asset-driven icon states
- [x] Multi-threaded parallel asset fetching (`Promise.all`) for Explore grid
- [x] Asymmetric grid cards and horizontal favorite cards

### Phase 3 & 4: Caching, Storage & Favorites ✅
- [x] AsyncStorage abstractions for favorites, like counts, and liked state
- [x] Real-time state updates for instant list deletions on Favorites screen
- [x] Bookmark and like persistence across app restarts

### Phase 5: Wallpaper Engine ✅ / 🔄 In Progress
- [x] Custom native Kotlin Expo module (`wallpaper-setter`) for direct wallpaper injection
- [x] Manual "Set as Wallpaper" from DetailScreen with full native file pipeline
- [ ] Native Android wallpaper picker intent (crop + position support)
- [ ] Auto wallpaper rotation via background task loop
- [ ] Settings screen for rotation frequency and category preferences

### Phase 6: Polish & New Features 🔄 Upcoming
- [ ] Tab swipe gestures (left/right navigation)
- [ ] Home screen swipe for next painting
- [ ] Doom scrolling in Explore
- [ ] Pinch to zoom on DetailScreen
- [ ] Dark mode
- [ ] Onboarding screen
- [ ] Art category filters
- [ ] Search in Explore and Favorites

### Phase 7: Firebase & Social 🔄 Future
- [ ] Comments on DetailScreen
- [ ] Shared like counts across users
- [ ] Cross-device favorites sync
- [ ] Top 5 most liked paintings
- [ ] Shared AI story cache

### Phase 8: CI/CD & Distribution 🔄 Future
- [ ] GitHub Actions CI (TypeScript + lint checks on every push)
- [ ] GitHub Actions CD (automatic APK build on release tag)
- [ ] Google Play Store submission

---

## 📸 Screenshots

*Coming soon — v1.1.0*

---

## ⚙️ Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- Android device connected via USB with USB Debugging enabled
- Android SDK installed and `ANDROID_HOME` configured
- Java 17 (Temurin recommended)
- Groq API key — get one free at [console.groq.com](https://console.groq.com)

### Installation & Execution

1. **Clone the repository:**
```bash
git clone https://github.com/abanoub-refaat/aethel-mobile.git
cd aethel-mobile
```

2. **Configure environment variables:**

Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_developer_api_key_here
```

3. **Install dependencies:**
```bash
npm install
```

4. **Compile and run native Android dev build:**
```bash
npx expo prebuild --clean
npx expo run:android
```

### Building a Release APK

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🗂️ Project Structure

```
aethel-mobile/
├── assets/                  # Static assets and icons
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ArtworkCard.tsx
│   │   ├── ArtworkFavoriteCard.tsx
│   │   ├── ArtworkOverlay.tsx
│   │   └── Toast.tsx
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── FavoriteScreen.tsx
│   │   └── SplashScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── services/            # External API services
│   │   ├── wikimedia.ts
│   │   └── ai.ts
│   ├── storage/             # AsyncStorage abstractions
│   │   ├── favorites.ts
│   │   └── likes.ts
│   ├── hooks/               # Custom React hooks
│   │   └── useToast.tsx
│   └── types/               # TypeScript interfaces
│       └── index.ts
├── metro.config.js
├── app.config.js
└── package.json
```

---

## 🙏 Acknowledgements

- Artwork sourced from [Wikimedia Commons](https://commons.wikimedia.org) — all paintings are public domain
- AI stories generated by [Groq](https://groq.com) using Llama 3.3 70B
- Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ by <a href="https://github.com/abanoub-refaat">Abanoub Refaat</a></p>
