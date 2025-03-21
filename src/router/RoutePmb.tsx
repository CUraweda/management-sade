import { RouteObject } from "react-router-dom";
import Kandidat from "../pages/pmb/Kandidat";
import Pembayaran from "../pages/pmb/Pembayaran";

const RoutePmb: RouteObject[] = [
  {
    path: "pembayaran",
    element: <Pembayaran />,
  },
  {
    path: "kandidat",
    element: <Kandidat />,
  },
];

export default RoutePmb;
