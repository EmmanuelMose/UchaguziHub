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
    id: "Candidate",
    name: "candidate",
    icon: AiOutlineCheckCircle,
    link: "candidate",
  },
  {
    id: "election",
    name: "election",
    icon: AiOutlineMessage,
    link: "election",
  },
  {
    id: "viewResults",
    name: "View Results",
    icon: AiOutlineBarChart,
    link: "viewResults",
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
  
];
