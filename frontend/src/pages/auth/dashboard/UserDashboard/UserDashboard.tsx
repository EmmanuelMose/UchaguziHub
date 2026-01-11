import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDrawerData, type DrawerData } from "../UserDashboard/aside/drawerData";
import CastVote from "../UserDashboard/castVote/CastVote";
import ViewResults from "../UserDashboard/viewResults/ViewResults";
import UserComplain from "../UserDashboard/complains/UserComplain";
import Analytics from "../UserDashboard/analytics/Analytics";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("castvote");

  const handleClick = (item: DrawerData) => {
    if (item.link === "logout") return;
    setSelected(item.link);
    navigate(item.link);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <ul>
          {userDrawerData.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-700 ${
                selected === item.link ? "bg-gray-700" : ""
              }`}
              onClick={() => handleClick(item)}
            >
              <item.icon size={20} />
              {item.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        {selected === "castvote" && <CastVote />}
        {selected === "results" && <ViewResults />}
        {selected === "complaints" && <UserComplain />}
        {selected === "analytics" && <Analytics electionId={""} />}
      </main>
    </div>
  );
};

export default UserDashboard;
