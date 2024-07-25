import { lazy, Suspense, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "../Component/Loading";
import Layout from "../Component/LayoutPetugas";
import LayoutAdmin from "../Component/LayoutAdmin";
import { LoginStore } from "../store/Store";

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

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: number[]; 
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { token, role } = LoginStore();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    if (roleId === 10) {
      return <Navigate to="/admin/home" />;
    } else if (roleId === 9) {
      return <Navigate to="/petugas/data" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

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
            <ProtectedRoute allowedRoles={[9]}>
              <Suspense fallback={<Loading />}>
                <Layout>
                  <DataPetugas />
                </Layout>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/petugas/home"
          element={
            <ProtectedRoute allowedRoles={[9]}>
              <Suspense fallback={<Loading />}>
                <Layout>
                  <HomePetugas />
                </Layout>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <Dashboard />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rekap-sampah"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <RekapSampah />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/daftar-petugas"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <DaftarPetugas />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jenis-sampah"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <JenisSampah />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/penjualan"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <PenjualanSampah />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/data-siswa"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <DataSiswa />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/export-qr"
          element={
            <ProtectedRoute allowedRoles={[10]}>
              <Suspense fallback={<Loading />}>
                <LayoutAdmin>
                  <ExportQr />
                </LayoutAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutHome;
