import { AiOutlineCheckCircle, AiOutlineBarChart, AiOutlineMessage, AiOutlineLogout } from "react-icons/ai";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
  requiresElectionClosed?: boolean;
};

export const userDrawerData: DrawerData[] = [
  {
    id: "castVote",
    name: "Cast Vote",
    icon: AiOutlineCheckCircle,
    link: "castvote",
  },
  {
    id: "viewResults",
    name: "View Results",
    icon: AiOutlineBarChart,
    link: "viewResults",
    requiresElectionClosed: true,
  },
  {
    id: "complaints",
    name: "Submit Complaint",
    icon: AiOutlineMessage,
    link: "complaints",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: AiOutlineBarChart,
    link: "analytics",
    requiresElectionClosed: true,
  },
  {
    id: "logout",
    name: "Log Out",
    icon: AiOutlineLogout,
    link: "logout",
  },
];
