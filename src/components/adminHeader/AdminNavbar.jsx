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
    <div className="w-full bg-black bg-opacity-80 text-white px-6 py-4 shadow flex justify-between items-center">
      <div></div>

      <div className="flex items-center gap-6">
        <IoMdNotificationsOutline className="text-2xl cursor-pointer hover:opacity-80 transition" />

        <Menu placement="bottom-end">
          <MenuHandler>
            <Button className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded text-sm normal-case font-medium">
              {userData?.username || "Admin"}
            </Button>
          </MenuHandler>
          <MenuList className="bg-white text-black">
            <MenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600"
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
