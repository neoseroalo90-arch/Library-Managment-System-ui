import { useEffect, useState } from "react";
import { createLoan } from "../services/loanService";
import { getBooks } from "../services/bookService";
import { getMembers } from "../services/memberService";

function LoanForm({ onLoanAdded }) {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const booksData = await getBooks();
        const membersData = await getMembers();

        setBooks(booksData);
        setMembers(membersData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newLoan = await createLoan({
        memberId,
        bookId,
      });

      onLoanAdded(newLoan);

      setBookId("");
      setMemberId("");
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
          <label>Member</label>
          <br />

          <select
            value={memberId}
            onChange={(e) =>
              setMemberId(e.target.value)
            }
            required
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option
                key={member._id}
                value={member._id}
              >
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Book</label>
          <br />

          <select
            value={bookId}
            onChange={(e) =>
              setBookId(e.target.value)
            }
            required
          >
            <option value="">Select Book</option>

            {books.map((book) => (
              <option
                key={book._id}
                value={book._id}
              >
                {book.title}
              </option>
            ))}
          </select>
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