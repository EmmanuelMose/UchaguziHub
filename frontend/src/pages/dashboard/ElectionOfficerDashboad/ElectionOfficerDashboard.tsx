import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import OfficerDrawer from "../ElectionOfficerDashboad/aside/drawerData";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type ElectionOfficerDashboardProps = {
  isElectionClosed?: boolean;
};

const ElectionOfficerDashboard = ({ isElectionClosed = true }: ElectionOfficerDashboardProps) => {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);
  const handleDrawerToggle = () => setIsDrawerExpanded(prev => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <div className="max-w-[1600px] mx-auto w-full border-x border-gray-300 shadow-xl bg-white rounded-2xl overflow-hidden">
        {/* Navbar */}
        <div className="mt-4 px-4">
          <Navbar />
        </div>

        {/* Top Bar */}
        <div className="mx-4 mt-6 flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-800 to-blue-900 px-6 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:scale-105">
          <button
            onClick={handleDrawerToggle}
            className="text-2xl text-gray-300 hover:text-white transition-transform duration-300 hover:scale-125"
          >
            {isDrawerExpanded ? <IoCloseSharp /> : <FaBars />}
          </button>
          <h1 className="text-xl font-semibold tracking-wide">
            Welcome to the Officer Dashboard
          </h1>
        </div>

        {/* Main Content */}
        <div className="mt-6 flex flex-col lg:flex-row min-h-[70vh] px-4 pb-6 gap-4">
          {/* Drawer */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isDrawerExpanded ? "w-full lg:w-64" : "w-0"
            } overflow-hidden`}
          >
            <OfficerDrawer
              isSidebarOpen={isDrawerExpanded}
              onToggle={handleDrawerToggle}
              isElectionClosed={isElectionClosed}
            />
          </div>

          {/* Main Section */}
          <main className="flex-1 rounded-2xl bg-gray-50 p-6 shadow-inner transition-all duration-300 hover:shadow-lg overflow-auto animate-fadeIn">
            <Outlet />
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

export default ElectionOfficerDashboard;