import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `https://marrrrry.vercel.app/dashboard/manage?search=${search}`
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleMakeAdmin = async (userId) => {
    try {
      const { data } = await axios.post(
        "https://marrrrry.vercel.app/dashboard/manage/make-admin",
        { userId }
      );
      alert(data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  const handleMakePremium = async (userId) => {
    try {
      const { data } = await axios.post(
        "https://marrrrry.vercel.app/dashboard/manage/make-premium",
        { userId }
      );
      alert(data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error making user premium:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">User Name</th>
            <th className="py-2 px-4 border">User Email</th>
            <th className="py-2 px-4 border">Make Admin</th>
            <th className="py-2 px-4 border">Make Premium</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={`${
                user.role
                  ? "bg-yellow-100" // Highlight admin users with a yellow background
                  : ""
              }`}
            >
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border text-center">
                {user.role ? (
                  <span className="text-yellow-600 font-bold">Admin</span>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Make Admin
                  </button>
                )}
              </td>
              <td className="py-2 px-4 border text-center">
                {user.premiumApproved ? (
                  <span className="text-green-500 font-bold">Premium</span>
                ) : (
                  <button
                    onClick={() => handleMakePremium(user._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Make Premium
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
