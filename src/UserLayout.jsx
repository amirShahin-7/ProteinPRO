import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Products from "./pages/products/Products"

const UserLayout = ({logged,setLogged,userInfo}) => {
  return (
    <div>
      {/* <Header logged={logged} setLogged={setLogged} userInfo={userInfo}/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login setLogged={setLogged} />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="products" element={<Products />} />
      </Routes> */}
    </div>
  )
}

export default UserLayout
