import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

export default function Team() {
  const { token } = useAuth();
  const [team, setTeam] = useState([]);

  const fetchTeam = async () => {
    try {
      const res = await api.get("/users/team", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeam(res.data);
    } catch (err) {
      console.error("Error fetching team:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">My Team</h2>
      {team.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        <ul>
          {team.map((u) => (
            <li key={u._id} className="p-2 border-b">
              {u.username} – {u.role} ({u.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
