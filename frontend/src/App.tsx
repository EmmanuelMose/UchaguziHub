import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../src/app/store"; 
import LandingPage from "./pages/LandingPage";
import Error from "./components/error/Error";
import Register from "../src/pages/auth/Register";
import VerifyUser from "../src/pages/auth/VerifyUser";
import Login from "../src/pages/auth/Login";
import ForgotPassword from "../../frontend/src/pages/auth/ForgetPassword";
import VerifyResetCode from "./pages/auth/VerifyResetCode";
import ResetPassword from "./pages/auth/ResetPassword";

import UserDashboard from "../src/pages/dashboard/UserDashboard/UserDashboard";
import CastVote from "./pages/dashboard/UserDashboard/castVote/CastVote";
import ViewResults from "./pages/dashboard/UserDashboard/viewResults/ViewResults";
import Analytics from "./pages/dashboard/UserDashboard/analytics/Analytics";
import UserComplain from "./pages/dashboard/UserDashboard/complains/UserComplain";

// ADMIN IMPORTS
import AdminDashboard from "../src/pages/dashboard/AdminDashboard/AdminDashboard";
//import ManageUsers from "../src/pages/dashboard/AdminDashboard/manageUsers/ManageUsers";
//import ElectionOfficer from "../src/pages/dashboard/AdminDashboard/electionOfficer/ElectionOfficer";
//import Reports from "../src/pages/dashboard/AdminDashboard/reports/Reports";
//import AdminViewResults from "../src/pages/dashboard/AdminDashboard/viewResults/ViewResults";

function App() {

  //const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'Admin');
  const isStudent = useSelector((state: RootState) => state.user.user?.role === 'Student');
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'Admin');

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
       isStudent ? <UserDashboard /> : <Login />,
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
          element: < Analytics />,
        },
      ]
    },

    // ADMIN ROUTES
    {
      path: '/admin-dashboard',
      element:
       isAdmin ? <AdminDashboard /> : <Login />,
       children: [
        {
          path: 'users',
          element: <Analytics />
        },
        {
          path: 'electionofficer',
          element: <Analytics />
        },
        {
          path: 'reports',
          element: <Analytics />
        },
        {
          path: 'viewResults',
          element: <Analytics />
        },
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