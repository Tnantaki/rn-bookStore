import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function About() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-lg">About Page</Text>
      <Link href={"/"} className="my-4 border-1">
        Back Home
      </Link>
    </View>
  );
}
