import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import context from "../../context/context";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setLogged, setUserData, userData } = useContext(context);

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-gradient-to-br from-[#181c2b]/90 via-[#232946]/90 to-[#0f172a]/90 text-gray-100 px-8 py-4 shadow-2xl border-b border-white/10 flex justify-between items-center backdrop-blur-xl">
      {/* Decorative overlays */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#00c6fb]/30 to-[#005bea]/10 rounded-full blur-2xl z-0" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tr from-[#ffb86b]/30 to-[#ff6bcb]/10 rounded-full blur-2xl z-0" />
      <div></div>
      <div className="flex items-center gap-6 z-10">
        <IoMdNotificationsOutline className="text-2xl cursor-pointer hover:text-[#00c6fb] transition" />
        <Menu placement="bottom-end">
          <MenuHandler>
            <Button className="bg-gradient-to-r from-[#00c6fb]/30 to-[#005bea]/30 hover:from-[#00c6fb]/60 hover:to-[#005bea]/60 text-white px-6 py-2 rounded-xl text-base font-bold shadow-md normal-case">
              {userData?.username || "Admin"}
            </Button>
          </MenuHandler>
          <MenuList className="bg-gradient-to-br from-[#232946]/90 to-[#181c2b]/90 text-white border border-white/10 shadow-xl rounded-xl">
            <MenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#ff6bcb] hover:text-red-500 font-bold"
            >
              <FiLogOut /> Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default AdminNavbar;
