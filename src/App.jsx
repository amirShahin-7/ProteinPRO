import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import context from "./context/context";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import NotAllowed from "./pages/admin/NotAllowed";
import { Typography } from "@material-tailwind/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/firebase";

const App = () => {
  const [logged, setLogged] = useState(false); // Keep logged state for clarity
  const [cart, setCart] = useState([]);
  // products state is no longer needed in global context as they are fetched in Products.jsx
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Check for user login status and fetch user data on app load
    const userId = localStorage.getItem("userId");
    setLogged(!!userId);

    if (userId) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            setUserData({ id: userDoc.id, ...userDoc.data() });
          }
        } finally {
          setLoading(false); // Ensure loading is set to false after attempting to fetch
        }
      };
      fetchUserData();
    } else {
      setLoading(false); // If no user ID, loading is done
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
