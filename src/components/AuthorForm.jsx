import { useState } from "react";
import { createAuthor } from "../services/authorService";

function AuthorForm({ onAuthorAdded }) {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newAuthor = await createAuthor({
        name,
        nationality,
      });

      onAuthorAdded(newAuthor);

      setName("");
      setNationality("");
      setMessage("Author added successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to add author."
      );
    }
  };

  return (
    <>
      <h2>Add Author</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Nationality</label>
          <br />
          <input
            type="text"
            value={nationality}
            onChange={(e) =>
              setNationality(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">
          Add Author
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}

export default AuthorForm;