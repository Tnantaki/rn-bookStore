import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Books() {
  const { books, fetchBooks } = useBooks();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchBooks();
  }, [])

  return (
    <View className="flex-1 items-center justify-center mt-20" style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    }}>
      <Text className="text-2xl font-semibold text-blue-600">
        Your Reading List
      </Text>
      <FlatList
        data={books}
        contentContainerClassName="mt-5 w-screen gap-3"
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Pressable className="py-3 px-5 rounded-lg w-5/6 mx-auto border-2 border-blue-700">
            <Text className="text-xl font-medium">{item.title}</Text>
            <Text className="text-lg">Written by : {item.author}</Text>
          </Pressable>
        )}
      />
      <Text>Hello</Text>
    </View>
  );
}
