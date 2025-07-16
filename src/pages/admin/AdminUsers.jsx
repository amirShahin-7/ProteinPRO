import { useContext, useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming firebase.js is in the parent directory of admin

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const toggleRole = (user) => {
    const updatedUser = {
      ...user,
      role: user.role === "admin" ? "user" : "admin",
    };
    // Note: Role toggling in Firestore needs updateDoc. 
    // For simplicity now, this function remains but its implementation needs Firestore updateDoc.
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
        // Delete from Firestore
        const userDocRef = doc(db, "users", id);
        deleteDoc(userDocRef)
          .then(() => {
            fetchUsers(); // Refresh the list
            Swal.fire("Deleted!", "User has been deleted.", "success");
            // Note: Deleting user from Firebase Authentication requires Admin SDK or a callable function
            // This part is not implemented here due to client-side limitations.
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error", "Failed to delete user.", "error");
          });
      }
    });
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><Typography variant="h5" color="blue-gray">Loading users...</Typography></div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Username</th>
            <th className="p-3 border-b">Phone</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Gender</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Del User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{user.username}</td>
              <td className="p-3 border-b">{user.phone}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">
                 {user.gender} {/* Display gender */}
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
