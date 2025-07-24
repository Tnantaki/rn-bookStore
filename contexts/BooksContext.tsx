import { createContext, PropsWithChildren, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useSession } from "./SessionContext";

const DATABASE_ID = "6878ab380027fd1f035e";
const COLLECTION_ID = "6878ab50003731062f7d";

export interface Book {
  title: string
  author: string
  description: string
}

export const BooksContext = createContext({
  books: [],
  readBooks: async () => {},
  readBookById: async (id: string) => {},
  createBook: async (book: Book) => {},
  updateBook: async (id: string, book: Book) => {},
  deleteBook: async (id: string) => {},
});

export const BooksProvider = ({ children }: PropsWithChildren) => {
  const { session, user } = useSession();
  const [books, setBooks] = useState([]);

  const readBooks = async () => {
    try {
    } catch (error) {}
  };

  const readBookById = async (id: string) => {
    try {
    } catch (error) {}
  };

  // ID.unique(),

  // {...data, userId: user.$id}

  const createBook = async (book: Book) => {
    try {
      if (!user) {
        throw new Error("There's no user id")
      }

      const newBook = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...book, userId: session },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };

  const updateBook = async (id: string, book: Book) => {
    try {
    } catch (error) {}
  };

  const deleteBook = async (id: string) => {
    try {
    } catch (error) {}
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        readBooks,
        readBookById,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
