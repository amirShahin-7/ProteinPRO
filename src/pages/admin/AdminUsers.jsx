import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const url = import.meta.env.VITE_DB_USERS;

  const fetchUsers = () => {
    axios.get(url).then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRole = (user) => {
    const updatedUser = {
      ...user,
      role: user.role === "admin" ? "user" : "admin",
    };
    ~axios.put(`${url}/${user.id}`, updatedUser).then(() => fetchUsers());
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/${id}`).then(() => {
          fetchUsers();
          Swal.fire("Deleted!", "User has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Username</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Del User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{user.username}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">
                <button
                  onClick={() => toggleRole(user)}
                  className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  {user.role === "admin" ? "Make User" : "Make Admin"}
                </button>
              </td>
              <td className="p-3 border-b">
                <span className="text-sm font-medium">
                  {user.role === "admin" ? "admin" : "user"}
                </span>
              </td>
              <td className="p-3 border-b">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
