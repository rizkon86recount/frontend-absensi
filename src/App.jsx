import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import UsersPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import AbsensiPage from "./pages/AbsensiPage";
import DashboardPage from "./pages/Dashboard"; // ✅ Tambahan

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="absolute top-2 right-4 text-red-600 underline">
          Logout
        </button>
      )}
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isLoggedIn ? <UsersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/absensi"
          element={isLoggedIn ? <AbsensiPage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
