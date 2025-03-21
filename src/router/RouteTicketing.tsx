import { RouteObject } from "react-router-dom";
import Layanan from "../pages/ticketing/Layanan";
import Daycare from "../pages/ticketing/Daycare";
import Spesialis from "../pages/ticketing/Spesialis";

const RouteTicketing: RouteObject[] = [
  {
    path: "layanan",
    element: <Layanan />,
  },
  {
    path: "spesialis",
    element: <Spesialis />,
  },
  {
    path: "daycare",
    element: <Daycare />,
  },
];

export default RouteTicketing;
