import { NavLink, useNavigate } from "react-router-dom";
import { userDrawerData, type DrawerData } from "./OfficerDrawer";

type OfficerDrawerProps = {
  isSidebarOpen: boolean;
  onToggle: () => void;
  isElectionClosed?: boolean;
};

const OfficerDrawer = ({ isSidebarOpen, onToggle, isElectionClosed = false }: OfficerDrawerProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className={`h-screen flex flex-col bg-gradient-to-b from-purple-900 via-purple-800 to-black text-white shadow-2xl transition-all duration-500 ease-in-out ${isSidebarOpen ? "w-72" : "w-20"}`}>
      <div className="flex items-center justify-between px-5 py-6 border-b border-purple-800">
        <span className={`text-lg font-semibold tracking-wide transition-all duration-300 ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
          Officer Dashboard
        </span>
        <button onClick={onToggle} className="text-purple-300 hover:text-white transition-transform duration-300 hover:scale-110">
          {isSidebarOpen ? "❮" : "❯"}
        </button>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {userDrawerData.map((item: DrawerData) => {
          if (item.requiresElectionClosed && !isElectionClosed) return null;
          if (item.id.toLowerCase() === "logout") {
            return (
              <button key={item.id} onClick={handleLogout} className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-transparent hover:bg-red-600/90 transition-all duration-300 shadow-md hover:shadow-red-700/40">
                <span className="text-red-400 group-hover:text-white transition">
                  <item.icon size={22} />
                </span>
                {isSidebarOpen && <span className="text-sm font-medium tracking-wide">{item.name}</span>}
              </button>
            );
          }
          return (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 shadow-md ${
                  isActive ? "bg-gradient-to-r from-purple-600 to-purple-800 shadow-purple-700/40" : "hover:bg-purple-800/60 hover:shadow-purple-700/30"
                }`
              }
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full transition-all duration-300 ${isSidebarOpen && "bg-purple-300"}`} />
              <span className="text-purple-300 group-hover:text-white transition duration-300">
                <item.icon size={22} />
              </span>
              {isSidebarOpen && <span className="text-sm font-medium tracking-wide group-hover:text-white">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-4 py-4 text-xs text-center text-purple-300 border-t border-purple-800">
        © {new Date().getFullYear()} Uchaguzi Hub
      </div>
    </aside>
  );
};

export default OfficerDrawer;