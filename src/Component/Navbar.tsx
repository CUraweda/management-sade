import React from "react";
import logo from "../assets/sade.png";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-md px-5">
        <div className="flex-1 gap-2">
          <div className="w-16">
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col font-bold">
            <span>Sekolah Alam</span>
            <span>Depok</span>
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="">
                <a className="text-red-500">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
