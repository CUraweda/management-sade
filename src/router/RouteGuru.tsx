import { RouteObject } from "react-router-dom";
import LesonPlan from "../pages/guru/LesonPlan";
import Pengumuman from "../pages/guru/Pengumuman";

const RouteGuru: RouteObject[] = [
  {
    path: "lesson-plan",
    element: <LesonPlan />,
  },
  {
    path: "pengumuman",
    element: <Pengumuman />,
  },
];

export default RouteGuru;
