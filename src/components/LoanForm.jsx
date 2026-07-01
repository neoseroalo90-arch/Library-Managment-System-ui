import { useState } from "react";
import { createLoan } from "../services/loanService";

function LoanForm({ onLoanAdded }) {
  const [memberId, setMemberId] = useState("");
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newLoan = await createLoan({
        memberId,
        bookId,
      });

      onLoanAdded(newLoan);

      setMemberId("");
      setBookId("");
      setMessage("Loan created successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create loan."
      );
    }
  };

  return (
    <>
      <h2>Create Loan</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Member ID</label>
          <br />
          <input
            type="text"
            value={memberId}
            onChange={(e) =>
              setMemberId(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Book ID</label>
          <br />
          <input
            type="text"
            value={bookId}
            onChange={(e) =>
              setBookId(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Loan
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}

export default LoanForm;