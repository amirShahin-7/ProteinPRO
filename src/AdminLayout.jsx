import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./components/adminHeader/AdminNavbar";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import Sidebar from "./components/adminHeader/Sidebar";
import AdminUsers from "./pages/admin/AdminUsers";
import Dashboard from "./pages/admin/Dashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import context from "./context/context";
import { Typography } from "@material-tailwind/react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userData } = useContext(context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData !== null) {
      setLoading(false);
      if (!userData || userData.role !== "admin") {
        navigate("/not-allowed");
      }
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Typography variant="h5" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

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
