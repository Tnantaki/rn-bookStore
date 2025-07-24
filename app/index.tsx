import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-transparent">
      <Image source={require("@/assets/images/react-logo.png")} />
      <Text className="text-xl text-purple-600">Reading List App</Text>
      <View className="flex-0 flex-col gap-2 mt-4">
        <Link
          href={"/sign-in"}
          className="p-3 bg-teal-400 rounded-lg font-medium text-center"
        >
          Sign-in
        </Link>
        <Link
          href={"/about"}
          className="p-3 bg-teal-400 rounded-lg font-medium text-center"
        >
          About Page
        </Link>
      </View>
    </View>
  );
}
