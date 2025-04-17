import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./components/adminHeader/AdminNavbar";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import Sidebar from "./components/adminHeader/Sidebar";
import AdminUsers from "./pages/admin/AdminUsers";
import Dashboard from "./pages/admin/Dashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/not-allowed");
    }
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <AdminNavbar />
        <div className="p-6">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="admin-users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-product/:id" element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
