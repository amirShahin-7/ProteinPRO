import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FiBox, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black bg-opacity-90 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">PRO GYM</h1>
      <ul className="space-y-4 text-sm">
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <MdDashboard className="text-lg" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <FiBox className="text-lg" />
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/admin/admin-users"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <FiUsers className="text-lg" />
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
