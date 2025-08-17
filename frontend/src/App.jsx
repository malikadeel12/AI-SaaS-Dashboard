import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";


import Users from "./pages/Users";
import Tenants from "./pages/Tenants";
import Team from "./pages/Team";
import AdminNotifications from "./pages/AdminNotifications"; 
import { useTheme } from "./context/ThemeContext";
function Dashboard() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
    >
      <h2 className="text-2xl font-semibold">Welcome to Dashboard 🚀</h2>
    </div>
  );
}

// Protected Route wrapper
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/tenants" element={<Tenants />} />
                      <Route path="/team" element={<Team />} />
                      <Route
                        path="/admin-notifications"
                        element={<AdminNotifications />} // ✅ New route
                      />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
