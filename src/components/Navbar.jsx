import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#f4f4f4",
        marginBottom: "20px",
      }}
    >
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/books">Books</Link> |{" "}
      <Link to="/members">Members</Link> |{" "}
      <Link to="/authors">Authors</Link> |{" "}
      <Link to="/loans">Loans</Link> |{" "}
      <Link to="/">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navbar;