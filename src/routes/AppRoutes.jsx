import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import Members from "../pages/Members";
import Authors from "../pages/Authors";
import Loans from "../pages/Loans";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
      <Route path="/members" element={<Members />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/loans" element={<Loans />} />
    </Routes>
  );
}

export default AppRoutes;