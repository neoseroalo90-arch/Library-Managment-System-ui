import { useState } from "react";
import { createBook } from "../services/bookService";

function BookForm({ onBookCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    available: true,
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const newBook = await createBook(formData);

      onBookCreated(newBook);

      setFormData({
        title: "",
        author: "",
        available: true,
      });

      setMessage("Book added successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not add the book. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="author">Author</label>
          <br />
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="available">
            <input
              id="available"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            {" "}Available
          </label>
        </div>

        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding book..." : "Add Book"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}

export default BookForm;