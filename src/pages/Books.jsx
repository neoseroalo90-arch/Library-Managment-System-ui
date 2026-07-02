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

      const data = await getBooks();

      setBooks(data);

      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load books."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleBookAdded = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);

    setBooks((prev) =>
      prev.filter((book) => book._id !== id)
    );
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1>Books</h1>

        <p>Manage all books in the library.</p>

        <BookForm onBookAdded={handleBookAdded} />

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