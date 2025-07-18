import React, { useContext, Fragment } from "react";
import context from "../context/context";
import { Menu, Transition } from "@headlessui/react";
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
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 px-2 py-1 rounded-lg hover:bg-blue-500/10">
          <img
            src={
              userData?.image ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
          />
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {userData?.username || "User"}
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-gradient-to-br from-[#232946]/90 to-[#181c2b]/90 text-white border border-white/10 shadow-xl rounded-xl focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate("/profile")}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left font-medium rounded-lg transition-colors ${
                    active ? "bg-[#00c6fb]/20 text-[#00c6fb]" : "text-white"
                  }`}
                >
                  <CgProfile className="text-lg" />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left font-medium rounded-lg transition-colors ${
                    active ? "bg-[#ff6bcb]/20 text-red-500" : "text-[#ff6bcb]"
                  }`}
                >
                  <FiPower className="text-lg" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
