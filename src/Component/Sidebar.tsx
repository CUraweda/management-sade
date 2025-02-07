import React, { useState } from "react";
import { BsListNested } from "react-icons/bs";
import { iconMapping } from "../Component/IconMapping";
import logo from "../assets/sade.png";
import { Link, useLocation } from "react-router-dom";
import data from "../data/Sidebar.json";

// import karywan from "../data/karyawan.json"

interface Menu {
  title: string;
  url: string;
  icon: string;
  submenu: boolean;
  subtitle?: subtitle[];
}

type subtitle = {
  name: string;
  url: string;
};

const Sidebar = () => {
  const location = useLocation();
  const Side = sessionStorage.getItem("side") || "/";

  const [activeMenuItem, setActiveMenuItem] = useState<string>(Side);

  const handleMenuItemClick = (name: string) => {
    setActiveMenuItem(name);
    sessionStorage.setItem("side", name);
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu p-4 w-80 bg-base-100 min-h-screen">
            <div className="w-full flex justify-between mb-10 items-center  pb-6">
              <div className="flex justify-center items-center gap-2">
                <img src={logo} alt="logo" className="w-16" />
                <p className="sm:text-lg text-lg font-semibold">
                  Sekolah Alam Depok
                </p>
              </div>
              <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost text-3xl font-bold lg:hidden"
              >
                <BsListNested />
              </label>
            </div>
            <ul className="menu srounded-lg max-w-xs w-full text-gray-500">
              {data.map((item: Menu, index: number) => (
                <React.Fragment key={`menu-` + index}>
                  {item.submenu ? (
                    <li className="my-2">
                      <details
                        open={item.subtitle?.some((s) =>
                          location.pathname.includes(s.url)
                        )}
                      >
                        <summary>
                          <span className="text-2xl">
                            {iconMapping[item.icon]}
                          </span>
                          <a>{item.title}</a>
                        </summary>
                        <ul>
                          {item.subtitle?.map(
                            (Item: subtitle, Index: number) => (
                              <Link to={Item.url} key={`link-` + Index}>
                                <li
                                  key={`subtitle-` + Index}
                                  className={`my-2 transition duration-200 rounded-md ${
                                    location.pathname.includes(Item.url)
                                      ? "text-primary bg-primary/20 font-semibold"
                                      : ""
                                  }`}
                                >
                                  <p>{Item.name}</p>
                                </li>
                              </Link>
                            )
                          )}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    <Link to={item.url} key={`link-` + index}>
                      <li
                        className={`my-2 transition duration-200 rounded-md ${
                          activeMenuItem === item.url
                            ? "bg-color-2 text-color-4"
                            : ""
                        }`}
                        onClick={() => handleMenuItemClick(item.url)}
                      >
                        <div>
                          <span className="text-2xl">
                            {iconMapping[item.icon]}
                          </span>
                          <p>{item.title}</p>
                        </div>
                      </li>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
