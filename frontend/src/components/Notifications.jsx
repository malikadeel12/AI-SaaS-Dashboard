import { useEffect, useState, useRef } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function Notifications() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    await api.put(
      `/notifications/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchNotifications();
  };

  const markAllAsRead = async () => {
    await api.put(
      `/notifications/read-all`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="relative text-2xl">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded p-3 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-500 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="text-gray-500">No notifications</li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n._id}
                    onClick={() => markAsRead(n._id)}
                    className={`p-2 mb-1 rounded cursor-pointer transition ${
                      n.isRead
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400"
                        : "bg-blue-100 dark:bg-blue-900 text-black dark:text-white"
                    }`}
                  >
                    <p className="line-clamp-2">{n.message}</p>
                    <span className="block text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
