import Notifications from "./Notifications";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const role = user?.role?.toLowerCase();

  return (
    <header
      className={`flex justify-between items-center shadow p-4 transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-200 text-gray-900"
      }`}
    >
      {/* Left Side */}
      <h1 className="text-xl font-bold">AI SaaS Dashboard</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notifications → only for Users & Managers */}
        {(role === "user" || role === "manager") && <Notifications />}

        {/* 🌙/🌞 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
           {theme === "light" ? "Dark 🌙" : "Light 🌞"} 
        </button>

        {/* 👤 Username */}
        <span className="font-medium">{user?.username}</span>

        {/* 🚪 Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
