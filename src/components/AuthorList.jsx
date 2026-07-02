function AuthorList({
  authors,
  isLoading,
  error,
  onDeleteAuthor,
}) {
  if (isLoading) {
    return <p>Loading authors...</p>;
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

  if (authors.length === 0) {
    return (
      <p
        style={{
          fontStyle: "italic",
        }}
      >
        No authors have been added yet.
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
        Existing Authors
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            backgroundColor: "#1d7bff",
            color: "#ffffff",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>
              Name
            </th>

            <th style={{ padding: "12px" }}>
              Nationality
            </th>

            <th style={{ padding: "12px" }}>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author) => (
            <tr
              key={author._id}
              style={{
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "12px" }}>
                {author.name}
              </td>

              <td style={{ padding: "12px" }}>
                {author.nationality}
              </td>

              <td style={{ padding: "12px" }}>
                <button
                  onClick={() =>
                    onDeleteAuthor(author._id)
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

export default AuthorList;