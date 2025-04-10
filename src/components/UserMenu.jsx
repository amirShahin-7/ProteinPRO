import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React,{ useState } from "react";
import { Link } from "react-router-dom";

const UserMenu = ({setLogged,userInfo}) => {
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogOut =() =>{
    setLogged(false);
    localStorage.removeItem("ui");

  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={label == "Sign Out" && handleLogOut}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        {userInfo?.role == "admin" && (
         < Link className="block w-full text-center" to ="/admin">Admin</Link>
        )}
      </MenuList>
    </Menu>
  );
}

export default UserMenu
