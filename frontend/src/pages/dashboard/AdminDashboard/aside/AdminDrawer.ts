// src/pages/dashboard/AdminDashboard/aside/AdminDrawerData.ts

import {
  AiOutlineCheckCircle,
  AiOutlineBarChart,
  AiOutlineMessage,
  AiOutlineLogout,
} from "react-icons/ai";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
  requiresElectionClosed?: boolean;
};

export const adminDrawerData: DrawerData[] = [
  {
    id: "Users",
    name: "Manage Users",
    icon: AiOutlineCheckCircle,
    link: "users",
  },
  {
    id: "ElectionOfficer",
    name: "Election Officers",
    icon: AiOutlineMessage,
    link: "electionofficer",
  },
  {
    id: "Reports",
    name: "Reports",
    icon: AiOutlineBarChart,
    link: "reports",
  },
  {
    id: "viewResults",
    name: "View Results",
    icon: AiOutlineBarChart,
    link: "viewResults",
    requiresElectionClosed: true,
  },
  {
    id: "logout",
    name: "Log Out",
    icon: AiOutlineLogout,
    link: "logout",
  },
];