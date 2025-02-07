import React, { FC } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
  name?: string;
}
const Layout: FC<Props> = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen" data-theme="light">
        <div className="flex flex-grow ">
          <div className="z-50">
            <Sidebar />
          </div>
          <div className="w-full bg-color-1">
            <div className="">
              <Navbar />
            </div>
            <div className="max-w-7xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
