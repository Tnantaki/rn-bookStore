import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../../components/button";
import { Book } from "../../contexts/BooksContext";
import useBooks from "../../hooks/useBooks";

export default function Create() {
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { createBook } = useBooks();

  const handleSubmit = async () => {
    setError("");
    try {
      if (
        !book.title.trim() ||
        !book.author.trim() ||
        !book.description.trim()
      ) {
        throw new Error("Input can't be empty!");
      }
      await createBook(book);

      setBook({ title: "", author: "", description: "" });
      router.replace("/books");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-semibold text-blue-600">
          Add a New Book
        </Text>
        <View className="flex-0 bg-red w-8/12 m-4 gap-5">
          <TextInput
            placeholder="Title"
            className="border-2 border-blue-700 px-4 py-3 rounded-md text-lg"
            onChangeText={(text) => setBook({ ...book, title: text })}
            value={book.title}
          />
          <TextInput
            placeholder="Author"
            className="border-2 border-blue-700 px-4 py-3 rounded-md text-lg"
            onChangeText={(text) => setBook({ ...book, author: text })}
            value={book.author}
          />
          <TextInput
            placeholder="Description"
            className="border-2 border-blue-700 px-4 py-3 rounded-md text-lg min-h-24"
            onChangeText={(text) => setBook({ ...book, description: text })}
            value={book.description}
            multiline={true}
            textAlignVertical="top"
          />
          {error && <Text className="mb-2 text-red-600">{error}</Text>}
        </View>
        <Button
          title={loading ? "Saving..." : "Create"}
          onPress={handleSubmit}
          className="bg-blue-600 text-white py-4 px-6 rounded-lg text-xl mb-4"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
