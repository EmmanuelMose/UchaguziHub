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
    link: "manage-users",
  },
  {
    id: "viewResults",
    name: "View Results",
    icon: AiOutlineBarChart,
    link: "view-results",
    requiresElectionClosed: true,
  },
  {
    id: "Reports",
    name: "Reports",
    icon: AiOutlineBarChart,
    link: "reports",
  },
   {
    id: "analytics",
    name: "Analytics",
    icon: AiOutlineBarChart,
    link: "show-analytics",
    requiresElectionClosed: true,
  },
  {
    id: "complaints",
    name: "Complains",
    icon: AiOutlineMessage,
    link: "view-complains",
  },
  {
    id: "logout",
    name: "Log Out",
    icon: AiOutlineLogout,
    link: "logout",
  },
];