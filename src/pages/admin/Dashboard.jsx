import { useContext, useEffect, useState } from "react";
import context from "../../context/context";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../context/firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const { products, userData } = useContext(context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalNormalUsers = users.filter((u) => u.role === "user").length;
  const totalProducts = products.length;
  const latestProducts = products.slice(-4);

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] p-8 font-sans text-gray-100 relative overflow-hidden pt-32 w-full">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-3xl z-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        <div className="bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
          <h1 className="font-extrabold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea]">
            Total Users
          </h1>
          <p className="text-3xl font-bold text-[#00c6fb]">{totalUsers}</p>
          <div className="text-sm text-gray-300 mt-2">
            admins: <span className="text-[#ffb86b]">{totalAdmins}</span> |
            users: <span className="text-[#ff6bcb]">{totalNormalUsers}</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
          <h1 className="font-extrabold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb]">
            Total Products
          </h1>
          <p className="text-3xl font-bold text-[#ffb86b]">{totalProducts}</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 rounded-2xl shadow-2xl p-8 mt-10 backdrop-blur-xl z-10 relative">
        <h1 className="font-extrabold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00c6fb] to-[#005bea]">
          Latest Products
        </h1>
        <ul className="list-disc pl-5 text-gray-200">
          {latestProducts.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
      <div className="bg-gradient-to-br from-[#232946]/80 to-[#181c2b]/80 border border-white/10 rounded-2xl shadow-2xl p-8 mt-10 flex flex-wrap gap-4 backdrop-blur-xl z-10 relative">
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-gradient-to-r from-[#00c6fb] to-[#005bea] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-gradient-to-r from-[#ffb86b] to-[#ff6bcb] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Edit Products
        </button>
        <button
          onClick={() => navigate("/admin/admin-users")}
          className="bg-gradient-to-r from-[#232946] to-[#181c2b] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
