import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

import {
  getBooks,
  deleteBook,
} from "../services/bookService";

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load books."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((currentBooks) => [
      ...currentBooks,
      newBook,
    ]);
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteBook(id);

      setBooks((currentBooks) =>
        currentBooks.filter(
          (book) => book._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete book."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main>
        <h1>Books</h1>

        <BookForm
          onBookAdded={handleBookAdded}
        />

        <hr />

        <BookList
          books={books}
          isLoading={isLoading}
          error={error}
          onDeleteBook={handleDeleteBook}
        />
      </main>
    </>
  );
}

export default Books;