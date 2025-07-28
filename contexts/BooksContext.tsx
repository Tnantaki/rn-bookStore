import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
import { client, databases } from "../lib/appwrite";
import { useSession } from "./SessionContext";

const DATABASE_ID = "6878ab380027fd1f035e";
const COLLECTION_ID = "6878ab50003731062f7d";

export interface Book {
  title: string;
  author: string;
  description: string;
}

export type BookDocument = Book & Models.Document;

export const BooksContext = createContext<{
  books: BookDocument[];
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<BookDocument | null>;
  createBook: (book: Book) => Promise<void>;
  updateBook: (id: string, book: Book) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}>({
  books: [],
  fetchBooks: async () => {},
  fetchBookById: async (id: string) => null,
  createBook: async (book: Book) => {},
  updateBook: async (id: string, book: Book) => {},
  deleteBook: async (id: string) => {},
});

export const BooksProvider = ({ children }: PropsWithChildren) => {
  const { session, user } = useSession();
  const [books, setBooks] = useState<BookDocument[]>([]);

  const fetchBooks = async () => {
    try {
      if (!user) {
        throw new Error("There's no user id");
      }

      const res = await databases.listDocuments<BookDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );

      setBooks(res.documents);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };

  const fetchBookById = async (id: string) => {
    try {
      const res = databases.getDocument<BookDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // ID.unique(),

  // {...data, userId: user.$id}

  const createBook = async (book: Book) => {
    try {
      if (!user) {
        throw new Error("There's no user id");
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

  useEffect(() => {
    let unsubscribe = undefined;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      // appwrite provide realtime update which run via Websocket connection
      unsubscribe = client.subscribe<BookDocument>(channel, (res) => {
        const { payload, events } = res;

        if (events[0].includes("create")) {
          setBooks((prevBooks) => [...prevBooks, payload]);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
