import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#f4f4f4",
        marginBottom: "20px",
      }}
    >
      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/books">Books</Link> |{" "}
          <Link to="/members">Members</Link> |{" "}
          <Link to="/authors">Authors</Link> |{" "}
          <Link to="/loans">Loans</Link> |{" "}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;