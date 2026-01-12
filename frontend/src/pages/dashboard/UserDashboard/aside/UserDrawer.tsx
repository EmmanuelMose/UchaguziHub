import { NavLink, useNavigate } from "react-router-dom";
import { userDrawerData, type DrawerData } from "./drawerData";

type UserDrawerProps = {
  isSidebarOpen: boolean;
  onToggle: () => void;
  isElectionClosed?: boolean;
};

const UserDrawer = ({
  isSidebarOpen,
  onToggle,
  isElectionClosed = false,
}: UserDrawerProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside
      className={`bg-gray-900 text-white h-full flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="p-6 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
        {isSidebarOpen && <span>User Dashboard</span>}
        <button onClick={onToggle} className="text-gray-300 hover:text-white text-xl">
          {isSidebarOpen ? "❌" : "☰"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {userDrawerData.map((item: DrawerData) => {
          if (item.requiresElectionClosed && !isElectionClosed) return null;

          if (item.id === "logout") {
            return (
              <button
                key={item.id}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </button>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-800"
                }`
              }
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-center text-gray-400 border-t border-gray-700">
        © {new Date().getFullYear()} Uchaguzi Hub
      </div>
    </aside>
  );
};

export default UserDrawer;
