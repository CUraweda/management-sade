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
        <div className="flex">
          <div className="z-50">
            <Sidebar />
          </div>
          <div className="grow overflow-x-hidden bg-base-300">
            <div className="">
              <Navbar />
            </div>
            <div className="grow">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
