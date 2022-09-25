import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errors/ErrorPage";
import PresentationPage from "../pages/presentations/PresentationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "presentation",
    element: <PresentationPage></PresentationPage>,
  },
]);
