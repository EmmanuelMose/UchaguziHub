import { AiOutlineCheckCircle, AiOutlineBarChart, AiOutlineMessage } from "react-icons/ai";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
  requiresElectionClosed?: boolean;
};

export const userDrawerData: DrawerData[] = [
  {
    id: "Users",
    name: "users",
    icon: AiOutlineCheckCircle,
    link: "users",
  },
  {
    id: "viewResults",
    name: "View Results",
    icon: AiOutlineBarChart,
    link: "viewResults",
    requiresElectionClosed: true,
  },
  {
    id: "ElectionOfficer",
    name: "ElectionOfficer",
    icon: AiOutlineMessage,
    link: "electionofficer",
  },
  {
    id: "Reports",
    name: "reports",
    icon: AiOutlineBarChart,
    link: "reports",
  },
  
];
