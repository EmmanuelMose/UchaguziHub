import { NavLink, useNavigate } from "react-router-dom";
import { userDrawerData, type DrawerData } from "./drawerData";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

type UserDrawerProps = {
  isSidebarOpen: boolean;
  onToggle: () => void;
  isElectionClosed?: boolean;
};

const UserDrawer = ({ isSidebarOpen, onToggle, isElectionClosed = false }: UserDrawerProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed z-50 h-full w-72 bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white shadow-2xl flex flex-col md:relative md:translate-x-0"
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-blue-800">
          <span className={`text-lg font-semibold tracking-wide transition-all duration-300 ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>User Dashboard</span>
          <button onClick={onToggle} className="text-blue-300 hover:text-white md:hidden">
            {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-3 overflow-y-auto">
          {userDrawerData.map((item: DrawerData) => {
            if (item.requiresElectionClosed && !isElectionClosed) return null;

            if (item.id === "logout") {
              return (
                <button key={item.id} onClick={handleLogout} className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-transparent hover:bg-red-600/90 transition-all duration-300 shadow-md hover:shadow-red-700/50 transform hover:scale-105">
                  <span className="text-red-400 group-hover:text-white transition"><item.icon size={22} /></span>
                  {isSidebarOpen && <span className="text-sm font-medium tracking-wide">{item.name}</span>}
                </button>
              );
            }

            return (
              <NavLink key={item.id} to={item.link} className={({ isActive }) => `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 shadow-md transform hover:scale-105 ${isActive ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-blue-700/50" : "hover:bg-blue-800/60 hover:shadow-blue-700/30"}`}>
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full transition-all duration-300 ${isSidebarOpen && "bg-blue-300"}`} />
                <span className="text-blue-300 group-hover:text-white transition duration-300"><item.icon size={22} /></span>
                {isSidebarOpen && <span className="text-sm font-medium tracking-wide group-hover:text-white">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 text-xs text-center text-blue-300 border-t border-blue-800">
          © {new Date().getFullYear()} Uchaguzi Hub
        </div>
      </motion.div>
      {!isSidebarOpen && (
        <button onClick={onToggle} className="fixed z-40 top-5 left-5 md:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-500 transition-all">
          <AiOutlineMenu size={22} />
        </button>
      )}
    </>
  );
};

export default UserDrawer;