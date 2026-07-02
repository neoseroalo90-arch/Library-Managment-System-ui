import { useState } from "react";
import { createBook } from "../services/bookService";

function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBook = await createBook({
        title,
        author,
        available,
      });

      onBookAdded(newBook);

      setTitle("");
      setAuthor("");
      setAvailable(true);

      setMessage("Book added successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to add book."
      );
    }
  };

  return (
    <>
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Author</label>
          <br />
          <input
            type="text"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) =>
                setAvailable(e.target.checked)
              }
            />
            Available
          </label>
        </div>

        <br />

        <button type="submit">
          Add Book
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}

export default BookForm;