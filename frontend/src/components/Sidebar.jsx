import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; 

export default function Sidebar() {
  const { user } = useAuth();
  const { theme } = useTheme(); 
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  let sidebarItems = [{ name: "Dashboard", path: "/" }];

  const role = user?.role?.toLowerCase();
  console.log("Sidebar User Role:", role);

  if (role === "superadmin") {
    sidebarItems.push({ name: "Tenants", path: "/tenants" });
    sidebarItems.push({ name: "Users", path: "/users" });
    sidebarItems.push({ name: "Notifications", path: "/admin-notifications" });
  }

  if (role === "admin") {
    sidebarItems.push({ name: "Users", path: "/users" });
    sidebarItems.push({ name: "Notifications", path: "/admin-notifications" });
  }

  if (role === "manager") {
    sidebarItems.push({ name: "Team", path: "/team" });
  }

  return (
    <div
      className={`h-screen p-3 transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } ${collapsed ? "w-16" : "w-64"}`}
    >
      <button
        onClick={toggleSidebar}
        className={`mb-4 px-2 py-1 rounded ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {collapsed ? ">>" : "<< Collapse"}
      </button>
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className={`block p-2 rounded hover:bg-gray-500 ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
