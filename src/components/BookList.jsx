function BookList({
  books,
  isLoading,
  error,
  onDeleteBook,
}) {
  if (isLoading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return (
      <p
        style={{
          color: "red",
          fontWeight: "bold",
        }}
      >
        {error}
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p
        style={{
          fontStyle: "italic",
        }}
      >
        No books have been added yet.
      </p>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        Existing Books
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            backgroundColor: "#0b71ff",
            color: "#ffffff",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>Title</th>
            <th style={{ padding: "12px" }}>Author</th>
            <th style={{ padding: "12px" }}>Available</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr
              key={book._id}
              style={{
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "12px" }}>
                {book.title}
              </td>

              <td style={{ padding: "12px" }}>
                {book.author}
              </td>

              <td style={{ padding: "12px" }}>
                {book.available ? "✅ Yes" : "❌ No"}
              </td>

              <td style={{ padding: "12px" }}>
                <button
                  onClick={() =>
                    onDeleteBook(book._id)
                  }
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;