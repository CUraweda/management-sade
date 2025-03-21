import { RouteObject } from "react-router-dom";
import LesonPlan from "../pages/guru/LesonPlan";
import Odfyc from "../pages/guru/Odfyc";
import Pengumuman from "../pages/guru/Pengumuman";
import Prestasi from "../pages/guru/Prestasi";
import Presensi from "../pages/guru/Presensi";

const RouteGuru: RouteObject[] = [
  {
    path: "lesson-plan",
    element: <LesonPlan />,
  },
  {
    path: "odfyc",
    element: <Odfyc />,
  },
  {
    path: "presensi",
    element: <Presensi />,
  },
  {
    path: "pengumuman",
    element: <Pengumuman />,
  },
  {
    path: "prestasi",
    element: <Prestasi />,
  },
];

export default RouteGuru;
