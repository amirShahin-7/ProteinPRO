import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Products from "./pages/product/Products";
import Footer from "./components/Footer";
import ProductDetails from "./pages/product/ProductDetails";
import Profile from "./pages/Profile";
import { useContext } from "react";
import context from "./context/context";
import NotFound from "./pages/NotFound";
const UserLayout = () => {
  const { logged } = useContext(context);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={logged ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={logged ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserLayout;
