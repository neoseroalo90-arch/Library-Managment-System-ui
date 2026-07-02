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

  if (loans.length === 0) {
    return (
      <p
        style={{
          fontStyle: "italic",
        }}
      >
        No loans have been created yet.
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
        Existing Loans
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            backgroundColor: "#1576ff",
            color: "#ffffff",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>
              Member
            </th>

            <th style={{ padding: "12px" }}>
              Book
            </th>

            <th style={{ padding: "12px" }}>
              Loan Date
            </th>

            <th style={{ padding: "12px" }}>
              Returned
            </th>

            <th style={{ padding: "12px" }}>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan._id}
              style={{
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "12px" }}>
                {loan.memberId?.name || loan.memberId}
              </td>

              <td style={{ padding: "12px" }}>
                {loan.bookId?.title || loan.bookId}
              </td>

              <td style={{ padding: "12px" }}>
                {new Date(
                  loan.loanDate
                ).toLocaleDateString()}
              </td>

              <td style={{ padding: "12px" }}>
                {loan.returned ? "✅ Yes" : "❌ No"}
              </td>

              <td style={{ padding: "12px" }}>
                <button
                  onClick={() =>
                    onDeleteLoan(loan._id)
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

export default LoanList;