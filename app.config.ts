import { ExpoConfig, ConfigContext } from '@expo/config';

const defineConfig = ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    owner: "rodrigofn",
    name: "modelo-mobile",
    slug: "modelomobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.rodrigo.standard",
    },
    android: {
      package: "com.rodrigo.standard",
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./src/assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "2930ed11-c557-46c1-b437-1b153ae35e8c",
      },
      CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
      APPWRITE_COLLECTION_USERS_ID: process.env.APPWRITE_COLLECTION_USERS_ID,
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    },
  };
};

export default defineConfig;
