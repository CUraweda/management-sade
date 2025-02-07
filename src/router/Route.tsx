import { createBrowserRouter } from "react-router-dom";
import Layout from "../Component/Layout";
import RouteGuru from "./RouteGuru";
import Login from "../pages/Login";
import RouteBankSampah from "./RouteBankSampah";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "guru",
        children: RouteGuru,
      },
      {
        path: "bank-sampah",
        children: RouteBankSampah,
      },
    ],
  },
]);

export default Route;
