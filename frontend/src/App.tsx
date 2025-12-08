import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Error from "./components/error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <Error />, // Handles route errors for "/"
    },
    {
      path: "*", // Catch-all for non-existing routes
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
