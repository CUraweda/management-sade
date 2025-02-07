import { RouteObject } from "react-router-dom";
import JenisSampah from "../pages/bank-sampah/JenisSampah";
import Laporan from "../pages/bank-sampah/Laporan";

const RouteBankSampah: RouteObject[] = [
  {
    path: "jenis-sampah",
    element: <JenisSampah />,
  },
  {
    path: "laporan",
    element: <Laporan />,
  },
];

export default RouteBankSampah;
