import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

const useBooks = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default useBooks;