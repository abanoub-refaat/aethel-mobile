module.exports = {
  expo: {
    name: "Aethel",
    slug: "aethel-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/mobile-app-icon-new.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#f6f4f0",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.aethelmobile",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/mobile-app-icon-new.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
        "android.permission.ACCESS_MEDIA_LOCATION",
        "android.permission.READ_MEDIA_IMAGES",
        "android.permission.READ_MEDIA_VIDEO",
        "android.permission.SET_WALLPAPER",
      ],
      package: "com.anonymous.aethelmobile",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      groqApiKey: process.env.GROQ_API_KEY,
    },
    plugins: [
      "./plugins/withFileProvider",
      [
        "expo-media-library",
        {
          photosPermission: "Allow Aethel to save artwork to your gallery.",
          savePhotosPermission: "Allow Aethel to save artwork to your gallery.",
          isAccessMediaLocationEnabled: true,
        },
      ],
    ],
  },
};
