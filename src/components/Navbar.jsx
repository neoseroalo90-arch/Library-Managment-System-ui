import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "500",
    marginRight: "20px",
  };

  return (
    <nav
      style={{
        backgroundColor: "#096df8",
        color: "#ffffff",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
        }}
      >
        📚 Library Management System
      </h2>

      {token ? (
        <div>
          <Link style={linkStyle} to="/dashboard">
            Dashboard
          </Link>

          <Link style={linkStyle} to="/books">
            Books
          </Link>

          <Link style={linkStyle} to="/members">
            Members
          </Link>

          <Link style={linkStyle} to="/authors">
            Authors
          </Link>

          <Link style={linkStyle} to="/loans">
            Loans
          </Link>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link style={linkStyle} to="/">
            Login
          </Link>

          <Link style={linkStyle} to="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;