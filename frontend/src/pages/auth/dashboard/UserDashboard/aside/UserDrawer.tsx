import { NavLink, useNavigate } from "react-router-dom";
import { userDrawerData } from "./drawerData";

type UserDrawerProps = {
  isElectionClosed?: boolean; 
};

const UserDrawer = ({ isElectionClosed = false }: UserDrawerProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Student Dashboard
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {userDrawerData.map((item) => {
          // Hide results if election not closed
          if (item.requiresElectionClosed && !isElectionClosed) return null;

          // Logout is handled separately
          if (item.id === "logout") {
            return (
              <button
                key={item.id}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
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
