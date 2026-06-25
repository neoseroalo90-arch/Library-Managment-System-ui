function BookList({ books, isLoading, error, onDeleteBook }) {
  if (isLoading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <section>
      <h2>All Books</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.available ? "Yes" : "No"}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onDeleteBook(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default BookList;