import { createBrowserRouter } from "react-router-dom";
import Layout from "../Component/Layout";
import RouteGuru from "./RouteGuru";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: <></>,
      },
      {
        path: "guru",
        children: RouteGuru,
      },
    ],
  },
]);

export default Route;
