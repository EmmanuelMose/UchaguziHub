// src/pages/dashboard/AdminDashboard/AdminDashboard.tsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import AdminDrawer from "../AdminDashboard/aside/drawerData";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type AdminDashboardProps = {
  isElectionClosed?: boolean;
};

const AdminDashboard = ({ isElectionClosed = true }: AdminDashboardProps) => {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);

  const handleDrawerToggle = () => {
    setIsDrawerExpanded((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* PAGE CONTAINER */}
      <div className="max-w-[1600px] mx-auto w-full border-x border-gray-300 shadow-xl bg-white">
        {/* Navbar */}
        <div className="mt-4 px-4">
          <Navbar />
        </div>

        {/* Top Bar */}
        <div className="mx-4 mt-6 flex items-center gap-4 rounded-xl bg-gradient-to-r from-purple-800 to-purple-900 px-6 py-4 text-white shadow-lg">
          <button
            onClick={handleDrawerToggle}
            className="text-2xl text-gray-300 hover:text-white transition-transform duration-300 hover:scale-110"
          >
            {isDrawerExpanded ? <IoCloseSharp /> : <FaBars />}
          </button>

          <h1 className="text-xl font-semibold tracking-wide">
            Welcome to the Admin Dashboard
          </h1>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-6 flex min-h-[70vh] px-4 pb-6 gap-4">
          {/* Drawer */}
          <div
            className={`transition-all duration-300 ${
              isDrawerExpanded ? "w-64" : "w-0"
            } overflow-hidden`}
          >
            <AdminDrawer
              isSidebarOpen={isDrawerExpanded}
              onToggle={handleDrawerToggle}
              isElectionClosed={isElectionClosed}
            />
          </div>

          {/* Main Section */}
          <main className="flex-1 rounded-2xl bg-gray-50 p-6 shadow-inner overflow-auto">
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

export default AdminDashboard;