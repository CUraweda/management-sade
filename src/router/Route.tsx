import { lazy, Suspense, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../component/Layout";
import LesonPlan from "../pages/guru/LesonPlan";

const RoutHome = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LesonPlan />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutHome;
