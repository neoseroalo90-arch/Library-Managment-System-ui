import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Authors from "../pages/Authors";
import Books from "../pages/Books";
import Dashboard from "../pages/Dashboard";
import Loans from "../pages/Loans";
import Login from "../pages/Login";
import Members from "../pages/Members";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        }
      />

      <Route
        path="/authors"
        element={
          <ProtectedRoute>
            <Authors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/loans"
        element={
          <ProtectedRoute>
            <Loans />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;