import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "") // Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "")   // Your Project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME || "");   // Your package name

export const account = new Account(client);
export const avatars = new Avatars(client);

export const databases = new Databases(client);