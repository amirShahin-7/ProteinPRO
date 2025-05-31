import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Products from "./pages/product/Products";
import Footer from "./components/Footer";
import ProductDetails from "./pages/product/ProductDetails";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserLayout;
