import { useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function AdminNotifications() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setUsers(res.data));
  }, []);

  const sendNotification = async (e) => {
    e.preventDefault();
    await api.post(
      "/notifications",
      { userId, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessage("");
    alert("✅ Notification sent!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      <form onSubmit={sendNotification} className="space-y-2">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.username} ({u.role})
            </option>
          ))}
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="border p-2 rounded w-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
