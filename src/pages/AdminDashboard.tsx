"use client";
import { useEffect, useState } from "react";
//@ts-ignore
import axios from "../../backendService";

type User = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  blocked: boolean;
};

type Props = {};

const AdminDashboard = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchData = async () => {
    const response = await axios.get("/api/user");
    const filteredUsers = response.data.filter((user: any)=> user.email !== "admin@gmail.com")
    setUsers(filteredUsers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setDeleteModal(false);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      await axios.delete(`/api/user/${selectedUser._id}`);
      fetchData();
      closeDeleteModal();
    }
  };

  return (
    <div className="container mx-auto px-28 py-8">
      <h2 className="mb-6 text-3xl font-semibold text-purple-600">User Dashboard</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto border-collapse rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Logged In Date</th>
              {/* <th className="px-4 py-2">Blocked</th> */}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{user.username}</td>
                <td className="border px-4 py-2 text-center">{user.email}</td>
                <td className="border px-4 py-2 text-center">{user.phone}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                {/* <td className="border px-4 py-2 text-center">
                  {user.blocked ? "Yes" : "No"}
                </td> */}
                <td className="border px-4 py-2  text-center">
                  <button
                    className="rounded-3xl bg-red-600 px-4 py-2 text-white"
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-8">
            <h3 className="mb-4 text-xl font-semibold">Confirm Delete</h3>
            <p>Are you sure you want to delete the user?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-700"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="rounded bg-red-600 px-4 py-2 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;