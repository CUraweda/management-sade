import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../Component/Loading";
import Layout from "../Component/LayoutPetugas";
import LayoutAdmin from "../Component/LayoutAdmin";

const Login = lazy(() => import("../pages/login"));
const DataPetugas = lazy(() => import("../pages/Siswa/DataPetugas"));
const HomePetugas = lazy(() => import("../pages/Siswa/HomePetugas"));

const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));



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
      </Routes>
    </BrowserRouter>
  );
};

export default RoutHome;
