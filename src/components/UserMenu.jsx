import React, { useContext } from "react";
import context from "../context/context";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { FiPower } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();
  const { logged, setLogged, userData, setUserData } = useContext(context);

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <Menu>
      <MenuHandler>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            src={
              userData?.image ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="avatar"
            size="sm"
          />
          <span>{userData?.username || "User"}</span>
        </div>
      </MenuHandler>
      <MenuList className="text-black">
        <MenuItem onClick={() => navigate("/profile")}>
          <div className="flex items-center gap-2">
            <CgProfile className="text-lg" />
            Profile
          </div>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <div className="flex items-center gap-2">
            <FiPower className="text-lg" />
            Logout
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
