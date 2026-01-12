import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../src/app/store"; // Adjust the path to match your store location
 // Adjust the path to match your store location
import LandingPage from "./pages/LandingPage";
import Error from "./components/error/Error";
import Register from "../src/pages/auth/Register";
import VerifyUser from "../src/pages/auth/VerifyUser";
import Login from "../src/pages/auth/Login";
import ForgotPassword from "../../frontend/src/pages/auth/ForgetPassword";
import VerifyResetCode from "./pages/auth/VerifyResetCode";
import ResetPassword from "./pages/auth/ResetPassword";
//import AdminDashboard from "../src/pages/auth/dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../src/pages/dashboard/UserDashboard/UserDashboard";
//import OfficerDashboard from "../src/pages/auth/dashboard/ElectionOfficerDashboad/ElectionOfficerDashboard";
import CastVote from "./pages/dashboard/UserDashboard/castVote/CastVote";
import ViewResults from "./pages/dashboard/UserDashboard/viewResults/ViewResults";
import Analytics from "./pages/dashboard/UserDashboard/analytics/Analytics";
import UserComplain from "./pages/dashboard/UserDashboard/complains/UserComplain";


function App() {
  //const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'Admin');
   const isUser = useSelector((state: RootState) => state.user.user?.role === 'User');
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify-user",
      element: <VerifyUser />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-reset-code",
    element: <VerifyResetCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  
  // User dashboard routes
    {
      path: '/user-dashboard',
      element:
       isUser ? <UserDashboard /> : <Login />,
       children: [
        {
          path: 'castVote',
          element: < CastVote/>
        },
        {
          path: 'viewResults',
          element: < ViewResults/>,
        },
        {
          path: 'complaints',
          element: < UserComplain/>
        },
        {
          path: 'analytics',
          element: < Analytics electionId={""}/>,
        },
        
        // {
        //   path: 'logout',
        //   element: < />
        // },
         
      ]
    },
    
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

