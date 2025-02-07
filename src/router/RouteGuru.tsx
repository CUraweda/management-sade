import { RouteObject } from "react-router-dom";
import LesonPlan from "../pages/guru/LesonPlan";

const RouteGuru: RouteObject[] = [
  {
    path: "lesson-plan",
    element: <LesonPlan />,
  },
  {
    path: "pengumuman",
    element: <LesonPlan />,
  },
];

export default RouteGuru;
