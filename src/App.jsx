import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import context from "./context/context";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import NotAllowed from "./pages/admin/NotAllowed";
import { Typography } from "@material-tailwind/react";

const urlPro = import.meta.env.VITE_DB_PRODUCTS;
const urlUser = import.meta.env.VITE_DB_USERS;

const App = () => {
  const [products, setProducts] = useState([]);
  const [logged, setLogged] = useState(false);
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    axios.get(urlPro).then((res) => setProducts(res.data));
  };

  const fetchUserData = async (userId) => {
    try {
      const res = await axios.get(`${urlUser}/${userId}`);
      setUserData(res.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLogged(!!userId);
    if (userId) {
      fetchUserData(userId);
    } else {
      setLoading(false);
    }
  }, []);

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
    <context.Provider
      value={{
        products,
        setProducts,
        logged,
        setLogged,
        cart,
        setCart,
        userData,
        setUserData,
      }}
    >
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/not-allowed" element={<NotAllowed />} />
      </Routes>
    </context.Provider>
  );
};

export default App;
