import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function Tenants() {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [tenants, setTenants] = useState([]);

  const fetchTenants = async () => {
    try {
      const res = await api.get("/tenants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTenants(res.data);
    } catch (err) {
      console.error("Error fetching tenants:", err.response?.data || err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/tenants",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      fetchTenants();
    } catch (err) {
      console.error("Error creating tenant:", err.response?.data || err.message);
    }
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    alert("Tenant ID copied: " + id);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Tenants</h2>
      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tenant name"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      <ul>
        {tenants.map((t) => (
          <li
            key={t._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-gray-500 text-sm">ID: {t._id}</p>
            </div>
            <button
              onClick={() => copyToClipboard(t._id)}
              className="text-xs text-blue-600 underline"
            >
              Copy ID
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
