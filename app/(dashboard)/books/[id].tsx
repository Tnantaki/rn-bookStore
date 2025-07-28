import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { BookDocument } from "../../../contexts/BooksContext";
import useBooks from "../../../hooks/useBooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookDocument>();
  const { fetchBookById } = useBooks();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadBook = async () => {
      const bookData = await fetchBookById(id);
      if (bookData) {
        setBook(bookData);
      }
    };

    loadBook();
  }, [id]);

  if (!book) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <View className="flex-1 p-6 gap-2 pt-10" style={{ marginTop: insets.top }}>
      <Text className="text-2xl font-medium">{book.title}</Text>
      <Text className="text-xl">Written by : {book.author}</Text>
      <View className="bg-slate-200 p-2">
        <Text className="text-md">Book Description:</Text>
        <Text className="text-xl">{book.description}</Text>
      </View>
    </View>
  );
}
