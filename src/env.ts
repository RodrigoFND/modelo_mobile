import Constants from 'expo-constants';
import { z } from 'zod';
import { Env } from '../types/env';

const envSchema = z.object({
  apiUrl: z.string().url(),
  clerkPublishableKey: z.string(),
  appwriteCollectionUsersId: z.string(),
  appwriteCollectionTesteId: z.string(),
  appwriteDatabaseId: z.string(),
  appwriteProjectId: z.string(),
  appwriteEndpoint: z.string().url(),
});

const AmbientVariables: Env = {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || "",
    clerkPublishableKey: Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY,
    appwriteDatabaseId: Constants.expoConfig?.extra?.APPWRITE_DATABASE_ID,
    appwriteCollectionUsersId: Constants.expoConfig?.extra?.APPWRITE_COLLECTION_USERS_ID,
    appwriteCollectionTesteId: Constants.expoConfig?.extra?.APPWRITE_COLLECTION_TESTE_ID,
    appwriteProjectId: Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID,
    appwriteEndpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "",
};

const result = envSchema.safeParse(AmbientVariables);

if (!result.success) {
  console.error('Invalid environment variables:', result.error.format());
  throw new Error('Invalid environment variables');
}

export default AmbientVariables;
