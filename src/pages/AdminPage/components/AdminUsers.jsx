import React, { useEffect, useState } from "react";
import { api } from "../../../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/users");
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-8">Loading users...</div>;
  if (error)
    return <div className="text-center text-red-600 py-8">{error}</div>;

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#22333B] flex items-center gap-2 mb-4">
        <i className="fa-solid fa-users"></i> Users
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#EAE0D6]">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b last:border-none">
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
