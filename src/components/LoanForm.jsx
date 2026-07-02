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

      setMessage("✅ Loan created successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "❌ Failed to create loan."
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        Create Loan
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Member
          </label>

          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
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

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Book
          </label>

          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
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

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Create Loan
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default LoanForm;