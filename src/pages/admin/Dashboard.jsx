import { useContext, useEffect, useState } from "react";
import context from "../../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_DB_USERS;
  const { products, userData } = useContext(context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => setUsers(res.data));
  }, []);

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalNormalUsers = users.filter((u) => u.role === "user").length;
  const totalProducts = products.length;
  const latestProducts = products.slice(-4);

  return (
    <div className="p-6 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h1 className="font-bold text-lg mb-2">Total Users</h1>
          <p className="text-2xl">{totalUsers}</p>
          <div className="text-sm text-gray-600 mt-2">
            admins: {totalAdmins} | users: {totalNormalUsers}
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h1 className="font-bold text-lg mb-2">Total Products</h1>
          <p className="text-2xl">{totalProducts}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h1 className="font-bold text-lg mb-4">Latest Products</h1>
        <ul className="list-disc pl-5 text-gray-700">
          {latestProducts.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded shadow p-4 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Edit Products
        </button>
        <button
          onClick={() => navigate("/admin/admin-users")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
