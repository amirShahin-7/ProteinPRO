import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FiBox, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] text-white shadow-xl rounded-xl m-4 flex flex-col p-6 gap-8 pt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block w-3 h-3 bg-gradient-to-tr from-[#00c6fb] to-[#005bea] rounded-full animate-pulse" />
        <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#00c6fb] to-[#005bea] select-none">
          PROTEIN PRO
        </h1>
      </div>
      <hr className="border-white/10 mb-2" />

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[#00c6fb]/20 focus:bg-[#00c6fb]/30 group"
            >
              <MdDashboard className="text-xl group-hover:text-[#00c6fb] transition" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[#ffb86b]/20 focus:bg-[#ffb86b]/30 group"
            >
              <FiBox className="text-xl group-hover:text-[#ffb86b] transition" />
              <span className="font-medium">Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/admin-users"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[#ff6bcb]/20 focus:bg-[#ff6bcb]/30 group"
            >
              <FiUsers className="text-xl group-hover:text-[#ff6bcb] transition" />
              <span className="font-medium">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-[#232946]/40 focus:bg-[#232946]/50 group"
            >
              <FiUsers className="text-xl group-hover:text-[#232946] transition" />
              <span className="font-medium">Home</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
