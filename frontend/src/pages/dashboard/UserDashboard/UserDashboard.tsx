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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      
      {/* PAGE CONTAINER (LEFT & RIGHT BORDER) */}
      <div className="max-w-[1600px] mx-auto w-full border-x border-gray-300 shadow-xl bg-white">

        {/* Navbar */}
        <div className="mt-4 px-4">
          <Navbar />
        </div>

        {/* Top Bar */}
        <div className="mx-4 mt-6 flex items-center gap-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-2xl">
          <button
            onClick={handleDrawerToggle}
            className="text-2xl text-gray-300 hover:text-white transition-transform duration-300 hover:scale-110"
          >
            {isDrawerExpanded ? <IoCloseSharp /> : <FaBars />}
          </button>

          <h1 className="text-xl font-semibold tracking-wide">
            Welcome to the User Dashboard
          </h1>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="mt-6 flex min-h-[70vh] px-4 pb-6 gap-4">

          {/* Drawer */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isDrawerExpanded ? "w-64" : "w-0"
            } overflow-hidden`}
          >
            <UserDrawer
              isSidebarOpen={isDrawerExpanded}
              onToggle={handleDrawerToggle}
              isElectionClosed={isElectionClosed}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 rounded-2xl bg-gray-50 p-6 shadow-inner transition-all duration-300 hover:shadow-lg overflow-auto">
            <div className="animate-fadeIn">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Footer */}
        <div className="mb-4 px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
