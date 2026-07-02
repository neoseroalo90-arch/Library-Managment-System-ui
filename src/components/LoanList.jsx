function LoanList({
  loans,
  isLoading,
  error,
  onDeleteLoan,
}) {
  if (isLoading) {
    return <p>Loading loans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (loans.length === 0) {
    return <p>No loans found.</p>;
  }

  return (
    <>
      <h2>Loans</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Book ID</th>
            <th>Loan Date</th>
            <th>Returned</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.memberId}</td>
              <td>{loan.bookId}</td>
              <td>
                {new Date(
                  loan.loanDate
                ).toLocaleDateString()}
              </td>
              <td>
                {loan.returned
                  ? "Yes"
                  : "No"}
              </td>
              <td>
                <button
                  onClick={() =>
                    onDeleteLoan(loan._id)
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

export default LoanList;