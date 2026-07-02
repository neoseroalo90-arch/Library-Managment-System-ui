import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";

import {
  getLoans,
  deleteLoan,
} from "../services/loanService";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLoans = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getLoans();
      setLoans(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load loans."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  const handleLoanAdded = (newLoan) => {
    setLoans((currentLoans) => [
      ...currentLoans,
      newLoan,
    ]);
  };

  const handleDeleteLoan = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this loan?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLoan(id);

      setLoans((currentLoans) =>
        currentLoans.filter(
          (loan) => loan._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete loan."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1>Loans</h1>

        <p
          style={{
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Manage all library loans and returns.
        </p>

        <LoanForm
          onLoanAdded={handleLoanAdded}
        />

        <LoanList
          loans={loans}
          isLoading={isLoading}
          error={error}
          onDeleteLoan={handleDeleteLoan}
        />
      </main>
    </>
  );
}

export default Loans;