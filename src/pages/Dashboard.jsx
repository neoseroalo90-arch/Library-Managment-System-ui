import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { getBooks } from "../services/bookService";
import { getMembers } from "../services/memberService";
import { getAuthors } from "../services/authorService";
import { getLoans } from "../services/loanService";

function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    members: 0,
    authors: 0,
    loans: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [books, members, authors, loans] =
          await Promise.all([
            getBooks(),
            getMembers(),
            getAuthors(),
            getLoans(),
          ]);

        setStats({
          books: books.length,
          members: members.length,
          authors: authors.length,
          loans: loans.length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "20px",
        }}
      >
        <h1>Dashboard</h1>

        <p>
          Welcome to the Library Management
          System.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>📚</h2>
            <h3>{stats.books}</h3>
            <p>Total Books</p>
          </div>

          <div style={cardStyle}>
            <h2>👤</h2>
            <h3>{stats.members}</h3>
            <p>Total Members</p>
          </div>

          <div style={cardStyle}>
            <h2>✍️</h2>
            <h3>{stats.authors}</h3>
            <p>Total Authors</p>
          </div>

          <div style={cardStyle}>
            <h2>📖</h2>
            <h3>{stats.loans}</h3>
            <p>Total Loans</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;