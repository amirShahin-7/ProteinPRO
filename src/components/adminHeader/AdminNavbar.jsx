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
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import context from "../../context/context";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setLogged, setUsername } = useContext(context);
  const [username, setLocalUsername] = useState("");

  const userId = localStorage.getItem("userId");
  const url = import.meta.env.VITE_DB_USERS;

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
    setUsername("");
    navigate("/login");
  };

  useEffect(() => {
    if (userId) {
      axios.get(`${url}/${userId}`).then((res) => {
        setLocalUsername(res.data.username);
      });
    }
  }, [userId]);

  return (
    <div className="w-full bg-black bg-opacity-80 text-white px-6 py-4 shadow flex justify-between items-center">
      <div></div>

      <div className="flex items-center gap-6">
        <IoMdNotificationsOutline className="text-2xl cursor-pointer hover:opacity-80 transition" />

        <Menu placement="bottom-end">
          <MenuHandler>
            <Button className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded text-sm normal-case font-medium">
              {username}
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
