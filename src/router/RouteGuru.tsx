import { RouteObject } from "react-router-dom";
import LesonPlan from "../pages/guru/LesonPlan";
import Pengumuman from "../pages/guru/Pengumuman";
import Prestasi from "../pages/guru/Prestasi";

const RouteGuru: RouteObject[] = [
  {
    path: "lesson-plan",
    element: <LesonPlan />,
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
