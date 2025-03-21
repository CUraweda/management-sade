import { RouteObject } from "react-router-dom";
import HasilPendaftaran from "../pages/pmb/HasilPendaftaran";
import ProsesPendaftaran from "../pages/pmb/ProsesPendaftaran";

const RoutePmb: RouteObject[] = [
  {
    path: "hasil-pendaftaran",
    element: <HasilPendaftaran />,
  },
  {
    path: "proses-daftar",
    element: <ProsesPendaftaran />,
  },
];

export default RoutePmb;
