import { useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../context/firebase";
import { Typography } from "@material-tailwind/react";
import context from "../../context/context";

const AdminUsers = () => {
  const { logged } = useContext(context);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUsers = () => {
    setLoading(true);
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef)
      .then((snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        Swal.fire("Error", "Failed to fetch users.", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [logged]);

  const toggleRole = async () => {
    if (selectedUsers.length === 0) {
      Swal.fire("Warning", "Please select at least one user.", "warning");
      return;
    }
    const updates = selectedUsers.map((userId) => {
      const userRef = doc(db, "users", userId);
      const user = users.find((u) => u.id === userId);
      return updateDoc(userRef, {
        role: user.role === "admin" ? "user" : "admin",
      });
    });
    await Promise.all(updates);
    fetchUsers();
    setSelectedUsers([]);
    Swal.fire("Success", "Roles updated successfully!", "success");
  };

  const deleteUser = async () => {
    if (selectedUsers.length === 0) {
      Swal.fire("Warning", "Please select at least one user.", "warning");
      return;
    }
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
        const deletions = selectedUsers.map((userId) =>
          deleteDoc(doc(db, "users", userId))
        );
        Promise.all(deletions)
          .then(() => {
            fetchUsers();
            setSelectedUsers([]);
            Swal.fire("Deleted!", "Users have been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting users:", error);
            Swal.fire("Error", "Failed to delete users.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-gray-100">
        <Typography variant="h5" color="blue-gray">
          Loading users...
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] p-8 font-sans text-gray-100 relative overflow-hidden pt-32">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <div className="flex justify-between mb-4 z-10 relative">
        <button
          onClick={toggleRole}
          className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white text-sm font-bold shadow-md hover:scale-105 transition-transform"
        >
          Toggle Roles
        </button>
        <button
          onClick={deleteUser}
          className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#ff6bcb] to-[#ffb86b] text-white text-sm font-bold shadow-md hover:scale-105 transition-transform"
        >
          Delete Selected
        </button>
      </div>
      <div className="overflow-x-auto z-10 relative">
        <table className="min-w-full bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl text-white">
          <thead>
            <tr className="bg-gradient-to-r from-[#00c6fb]/20 to-[#005bea]/10 text-left">
              <th className="p-3 border-b border-white/10">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedUsers(
                      e.target.checked ? users.map((u) => u.id) : []
                    )
                  }
                  checked={selectedUsers.length === users.length}
                />
              </th>
              <th className="p-3 border-b border-white/10">Username</th>
              <th className="p-3 border-b border-white/10">Phone</th>
              <th className="p-3 border-b border-white/10">Email</th>
              <th className="p-3 border-b border-white/10">Gender</th>
              <th className="p-3 border-b border-white/10">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-white/10 transition cursor-pointer"
                onClick={() => {
                  if (selectedUsers.includes(user.id)) {
                    setSelectedUsers(
                      selectedUsers.filter((id) => id !== user.id)
                    );
                  } else {
                    setSelectedUsers([...selectedUsers, user.id]);
                  }
                }}
              >
                <td className="p-3 border-b border-white/10">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => {}}
                  />
                </td>
                <td className="p-3 border-b border-white/10">
                  {user.username}
                </td>
                <td className="p-3 border-b border-white/10">{user.phone}</td>
                <td className="p-3 border-b border-white/10">{user.email}</td>
                <td className="p-3 border-b border-white/10">{user.gender}</td>
                <td className="p-3 border-b border-white/10">
                  <span className="text-sm font-bold text-[#ffb86b]">
                    {user.role === "admin" ? "admin" : "user"}
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

export default AdminUsers;
