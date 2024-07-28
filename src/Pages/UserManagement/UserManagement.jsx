import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBlock = async () => {
    try {
      await Promise.all(
        selectedUsers.map((id) => axiosSecure.patch(`/users/block/${id}`))
      );
      refetch();
      setSelectedUsers([]);
      console.log("Blocked selected users:", selectedUsers);
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const handleUnblock = async () => {
    try {
      await Promise.all(
        selectedUsers.map((id) => axiosSecure.patch(`/users/unblock/${id}`))
      );
      refetch();
      setSelectedUsers([]);
      console.log("Unblocked selected users:", selectedUsers);
    } catch (error) {
      console.error("Error unblocking users:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedUsers.map((id) => axiosSecure.delete(`/users/${id}`))
      );
      refetch();
      setSelectedUsers([]);
      console.log("Deleted selected users:", selectedUsers);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">User Management</h2>
      <h3 className="text-xl mb-6">Total Users: {users.length}</h3>
      <div className="flex flex-wrap mb-4 gap-2">
        <button
          onClick={handleBlock}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
        >
          Block
        </button>
        <button
          onClick={handleUnblock}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all duration-300"
        >
          Unblock
        </button>
        <button
          onClick={handleDelete}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300"
        >
          Delete
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 border-gray-300 rounded"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map((user) => user._id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Registration Time
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-gray-600 border-gray-300 rounded"
                    onChange={() => handleSelectUser(user._id)}
                    checked={selectedUsers.includes(user._id)}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{user._id}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {user.creationTime
                    ? new Date(user.creationTime).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
