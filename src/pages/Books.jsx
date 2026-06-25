import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import Navbar from "../components/Navbar";
import { deleteBook, getBooks } from "../services/bookService";

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
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not load books. Please make sure the API is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleBookCreated = (newBook) => {
    setBooks((currentBooks) => [...currentBooks, newBook]);
  };

  const handleDeleteBook = async (bookId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteBook(bookId);

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== bookId)
      );
    } catch (requestError) {
      window.alert(
        requestError.response?.data?.message ||
          "Could not delete the book."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main>
        <h1>Books</h1>

        <BookForm onBookCreated={handleBookCreated} />

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