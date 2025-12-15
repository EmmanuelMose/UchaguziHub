import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Error from "./components/error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <Error />, 
    },
    {
      path: "*", 
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
