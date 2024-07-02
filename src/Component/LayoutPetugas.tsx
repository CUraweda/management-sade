import React, { FC } from "react";
import Navbar from "./Navbar";

interface Props {
  children?: React.ReactNode;
  name?: string;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen" data-theme="light">
        <div className="top-0 sticky z-50">
          <Navbar />
        </div>
        <div className="px-5 bg-color-1">{children}</div>
      </div>
    </>
  );
};

export default Layout;
