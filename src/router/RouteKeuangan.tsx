import { RouteObject } from "react-router-dom";
import Pemasukan from "../pages/keuangan/Pemasukan";
import Laporan from "../pages/keuangan/Laporan";

const RouteKeuangan: RouteObject[] = [
  {
    path: "pemasukan",
    element: <Pemasukan />,
  },
  {
    path: "laporan",
    element: <Laporan />,
  },
];

export default RouteKeuangan;
