import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Error from "./components/error/Error";
import Register from "../src/pages/auth/Register";
import VerifyUser from "../src/pages/auth/VerifyUser";
import Login from "../src/pages/auth/Login";
import AdminDashboard from "../src/pages/auth/dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../src/pages/auth/dashboard/UserDashboard/UserDashboard";
import OfficerDashboard from "../src/pages/auth/dashboard/ElectionOfficerDashboad/ElectionOfficerDashboard";

function App() {
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
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/user-dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/officer-dashboard",
      element: <OfficerDashboard />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
