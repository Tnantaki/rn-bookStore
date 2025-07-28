import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import useBooks from "../../hooks/useBooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Books() {
  const { books } = useBooks();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center mt-20" style={{
      paddingTop: insets.top,
      // paddingBottom: insets.bottom
    }}>
      <Text className="text-2xl font-semibold text-blue-600">
        Your Reading List
      </Text>
      <FlatList
        data={books}
        contentContainerClassName="py-3 w-screen gap-3"
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Pressable className="py-3 px-5 rounded-lg w-5/6 mx-auto border-2 border-blue-700 active:bg-blue-100"
          onPress={() => router.push(`/books/${item.$id}`)}>
            <Text className="text-xl font-medium">{item.title}</Text>
            <Text className="text-lg">Written by : {item.author}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
