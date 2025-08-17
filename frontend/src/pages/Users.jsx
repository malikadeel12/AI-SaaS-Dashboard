import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "User", tenant: "" });

  const fetchUsers = async () => {
    const res = await api.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ username: "", email: "", password: "", role: "User", tenant: "" });
      fetchUsers();
    } catch (err) {
      console.error("Create User Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error creating user");
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Users</h2>
      <form onSubmit={handleCreate} className="grid gap-2 mb-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        {user?.role === "SuperAdmin" && (
          <input
            type="text"
            placeholder="Tenant ID"
            value={form.tenant}
            onChange={(e) => setForm({ ...form, tenant: e.target.value })}
            className="border p-2 rounded"
          />
        )}

        <button className="bg-green-500 text-white py-2 rounded">Create User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u._id} className="p-2 border-b">
            {u.username} – {u.role} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
