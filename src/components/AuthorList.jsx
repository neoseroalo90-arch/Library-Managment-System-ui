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
    return <p>{error}</p>;
  }

  if (authors.length === 0) {
    return <p>No authors found.</p>;
  }

  return (
    <>
      <h2>Authors</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Nationality</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author) => (
            <tr key={author._id}>
              <td>{author.name}</td>
              <td>{author.nationality}</td>
              <td>
                <button
                  onClick={() =>
                    onDeleteAuthor(author._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AuthorList;