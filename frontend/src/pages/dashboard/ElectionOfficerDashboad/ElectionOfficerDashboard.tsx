import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import OfficerDrawer from "../AdminDashboard/aside/drawerData";
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
      <div className="max-w-[1600px] mx-auto w-full border-x border-gray-300 shadow-xl bg-white">
        <div className="mt-4 px-4">
          <Navbar />
        </div>
        <div className="mx-4 mt-6 flex items-center gap-4 rounded-xl bg-gradient-to-r from-purple-800 to-purple-900 px-6 py-4 text-white shadow-lg">
          <button onClick={handleDrawerToggle} className="text-2xl text-gray-300 hover:text-white transition-transform duration-300 hover:scale-110">
            {isDrawerExpanded ? <IoCloseSharp /> : <FaBars />}
          </button>
          <h1 className="text-xl font-semibold tracking-wide">Welcome to the Officer Dashboard</h1>
        </div>
        <div className="mt-6 flex min-h-[70vh] px-4 pb-6 gap-4">
          <div className={`transition-all duration-300 ${isDrawerExpanded ? "w-64" : "w-0"} overflow-hidden`}>
            <OfficerDrawer isSidebarOpen={isDrawerExpanded} onToggle={handleDrawerToggle} isElectionClosed={isElectionClosed} />
          </div>
          <main className="flex-1 rounded-2xl bg-gray-50 p-6 shadow-inner overflow-auto">
            <Outlet />
          </main>
        </div>
        <div className="mb-4 px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ElectionOfficerDashboard;