import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import { useSession } from "../../contexts/SessionContext";
import { account } from "../../lib/appwrite";
import { getUserProfile } from "../../services/profile";
import { Models } from "react-native-appwrite";

export default function Profile() {
  const { signOut } = useSession();
  const [profile, setProfile] = useState<Models.User<Models.Preferences>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.log("Error for fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }
  if (!profile) {
    return <Text>Failed to load profile</Text>
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-lg mt-5">Profile Page</Text>
      <Text className="font-bold text-lg mt-5">{profile.email}</Text>
      <Button
        title="Logout"
        className="p-3 bg-blue-500 rounded-md"
        onPress={() => signOut()}
      />
    </View>
  );
}
