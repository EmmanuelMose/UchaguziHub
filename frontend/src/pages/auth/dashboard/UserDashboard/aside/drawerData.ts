import { AiOutlineCheckCircle, AiOutlineBarChart, AiOutlineMessage, AiOutlineLogout } from "react-icons/ai";
//import { FaVoteYea } from "react-icons/fa6"; // optional alternative icon

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
    link: "results",
    requiresElectionClosed: true, 
  },
  {
    id: "complaints",
    name: "Submit Complaint",
    icon: AiOutlineMessage,
    link: "complaints",
  },
  {
    id: "logout",
    name: "Log Out",
    icon: AiOutlineLogout,
    link: "logout",
  },
];
