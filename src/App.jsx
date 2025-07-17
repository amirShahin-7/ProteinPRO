import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import context from "./context/context";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import NotAllowed from "./pages/admin/NotAllowed";
import { Typography } from "@material-tailwind/react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./context/firebase";

const App = () => {
  const [logged, setLogged] = useState(false);
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLogged(!!userId);

    if (userId) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserData({ id: userDoc.id, ...userDoc.data() });
          }
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };
    fetchProducts();
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
        logged,
        setLogged,
        cart,
        setCart,
        userData,
        setUserData,
        products,
        setProducts,
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
