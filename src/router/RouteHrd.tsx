import { RouteObject } from "react-router-dom";
import Lowongan from "../pages/hrd/Lowongan";
import Magang from "../pages/hrd/Magang";
import Presensi from "../pages/hrd/Presensi";
import Training from "../pages/hrd/Training";
import Karyawan from "../pages/hrd/Karyawan";
import Penilaian from "../pages/hrd/Penilaian";
import Gaji from "../pages/hrd/Gaji";

const RouteHrd: RouteObject[] = [
  {
    path: "lowongan",
    element: <Lowongan />,
  },
  {
    path: "magang",
    element: <Magang />,
  },
  {
    path: "presensi",
    element: <Presensi />,
  },
  {
    path: "training",
    element: <Training />,
  },
  {
    path: "karyawan",
    element: <Karyawan />,
  },
  {
    path: "penilaian",
    element: <Penilaian />,
  },
  {
    path: "gaji",
    element: <Gaji />,
  },
];

export default RouteHrd;
