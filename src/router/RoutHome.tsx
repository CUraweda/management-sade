import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../Component/Loading";
import Layout from "../Component/LayoutPetugas";
import LayoutAdmin from "../Component/LayoutAdmin";

const Login = lazy(() => import("../pages/login"));
const DataPetugas = lazy(() => import("../pages/Siswa/DataPetugas"));
const HomePetugas = lazy(() => import("../pages/Siswa/HomePetugas"));

const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const RekapSampah = lazy(() => import("../pages/Admin/RekapSampah"));
const DaftarPetugas = lazy(() => import("../pages/Admin/DaftarPetugas"));
const JenisSampah = lazy(() => import("../pages/Admin/JenisSampah"));
const PenjualanSampah = lazy(() => import("../pages/Admin/PenjualanSampah"));
const DataSiswa = lazy(() => import("../pages/Admin/DataSiswa"));
const ExportQr = lazy(() => import("../pages/Admin/ExportQr"));



const RoutHome = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/petugas/data"
          element={
            <Suspense fallback={<Loading />}>
              <Layout>
                <DataPetugas />
              </Layout>
            </Suspense>
          }
        />
        <Route
          path="/petugas/home"
          element={
            <Suspense fallback={<Loading />}>
              <Layout>
                <HomePetugas />
              </Layout>
            </Suspense>
          }
        />
        <Route
          path="/admin/home"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <Dashboard />
              </LayoutAdmin>
            </Suspense>
          }
        />
        <Route
          path="/admin/rekap-sampah"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <RekapSampah />
              </LayoutAdmin>
            </Suspense>
          }
        />
        <Route
          path="/admin/daftar-petugas"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <DaftarPetugas />
              </LayoutAdmin>
            </Suspense>
          }
        />
        <Route
          path="/admin/jenis-sampah"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <JenisSampah />
              </LayoutAdmin>
            </Suspense>
          }
        />
        <Route
          path="/admin/penjualan"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <PenjualanSampah />
              </LayoutAdmin>
            </Suspense>
          }
        />
        <Route
          path="/admin/data-siswa"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <DataSiswa />
              </LayoutAdmin>
            </Suspense>
          }
        />
        <Route
          path="/admin/export-qr"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutAdmin>
                <ExportQr />
              </LayoutAdmin>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutHome;
