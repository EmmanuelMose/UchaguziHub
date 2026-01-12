import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import UserDrawer from "./aside/UserDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type UserDashboardProps = {
  isElectionClosed?: boolean;
};

const UserDashboard = ({ isElectionClosed = true }: UserDashboardProps) => {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);

  const handleDrawerToggle = () => {
    setIsDrawerExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Top Bar */}
      <div className="flex px-6 py-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white items-center shadow">
        <button
          className="mr-4 text-gray-300 hover:text-white text-2xl"
          onClick={handleDrawerToggle}
        >
          {isDrawerExpanded ? <IoCloseSharp /> : <FaBars />}
        </button>
        <span className="text-xl font-semibold">Welcome to the User Dashboard</span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 transition-all duration-300 ease-in-out">
        {/* Drawer */}
        <UserDrawer
          isSidebarOpen={isDrawerExpanded}
          onToggle={handleDrawerToggle}
          isElectionClosed={isElectionClosed}
        />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto shadow-inner transition-all duration-300">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserDashboard;
