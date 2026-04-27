import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const API = axios.create({
    baseURL: "http://localhost:5000/api/users",
  });

  API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // UPDATE ROLE
  const updateRole = async (id, role) => {
    try {
      await API.put(`/${id}/role`, { role });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // FILTER
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.phone || "").includes(search);

    const matchRole = roleFilter ? u.role === roleFilter : true;

    return matchSearch && matchRole;
  });

  // PAGINATION
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Users Management
        </h1>
        <p className="text-gray-500 text-sm">
          Admin Control Panel
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          className="border p-2 rounded-lg focus:ring-2 focus:ring-[#878C53]"
          placeholder="Search email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        {loading ? (
          <div className="p-6 text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full text-left">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                currentUsers.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50">

                    {/* PHONE */}
                    <td className="p-3">
                      {u.phone || "N/A"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-3">
                      {u.email}
                    </td>

                    {/* ROLE */}
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          updateRole(u._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded text-sm border ${
                          u.role === "admin"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        )}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2">

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-[#878C53] text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

      </div>

    </div>
  );
};

export default UsersManagement;