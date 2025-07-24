import { Models } from "react-native-appwrite";
import { account } from "../lib/appwrite";

export const getUserProfile = async () => {
  try {
    const profile = await account.get<Models.User<Models.Preferences>>();
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
