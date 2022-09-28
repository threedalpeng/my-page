import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errors/ErrorPage";
import HomePage from "../pages/home/HomePage";
import PresentationPage from "../pages/presentations/PresentationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "presentation",
    element: <PresentationPage></PresentationPage>,
  },
]);
