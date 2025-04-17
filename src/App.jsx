import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import context from "./context/context";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import NotAllowed from "./pages/admin/NotAllowed";

const urlPro = import.meta.env.VITE_DB_PRODUCTS;

const App = () => {
  const [products, setProducts] = useState([]);

  const [username, setUsername] = useState("");
  const [logged, setLogged] = useState(false);

  const [cart, setCart] = useState([]);

  const getProducts = () => {
    axios.get(urlPro).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLogged(!!userId);
  }, []);

  return (
    <context.Provider
      value={{
        products,
        setProducts,
        logged,
        setLogged,
        cart,
        setCart,
        username,
        setUsername,
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
