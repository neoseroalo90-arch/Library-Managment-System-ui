import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AuthorForm from "../components/AuthorForm";
import AuthorList from "../components/AuthorList";

import {
  getAuthors,
  deleteAuthor,
} from "../services/authorService";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAuthors = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getAuthors();
      setAuthors(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load authors."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleAuthorAdded = (newAuthor) => {
    setAuthors((currentAuthors) => [
      ...currentAuthors,
      newAuthor,
    ]);
  };

  const handleDeleteAuthor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this author?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAuthor(id);

      setAuthors((currentAuthors) =>
        currentAuthors.filter(
          (author) => author._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete author."
      );
    }
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
        <h1>Authors</h1>

        <p
          style={{
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Manage all authors in the library.
        </p>

        <AuthorForm
          onAuthorAdded={handleAuthorAdded}
        />

        <AuthorList
          authors={authors}
          isLoading={isLoading}
          error={error}
          onDeleteAuthor={handleDeleteAuthor}
        />
      </main>
    </>
  );
}

export default Authors;