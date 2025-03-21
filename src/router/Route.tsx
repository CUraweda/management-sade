import { createBrowserRouter } from "react-router-dom";
import Layout from "../Component/Layout";
import RouteGuru from "./RouteGuru";
import Login from "../pages/Login";
import RouteBankSampah from "./RouteBankSampah";
import RouteKeuangan from "./RouteKeuangan";
import RouteHrd from "./RouteHrd";
import RoutePmb from "./RoutePmb";

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
      {
        path: "keuangan",
        children: RouteKeuangan,
      },
      {
        path: "hrd",
        children: RouteHrd,
      },
      {
        path: "pmb",
        children: RoutePmb,
      },
    ],
  },
]);

export default Route;
