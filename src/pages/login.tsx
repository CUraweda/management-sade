import React from "react";
import logo from "../assets/sade.png"

const login = () => {
  return (
    <>
      <div className="w-full bg-color-4 flex justify-center items-center min-h-screen">
        <div className="w-full sm:w-1/4 bg-white shadow-md rounded-md flex justify-center items-center p-3 flex-col">
          <div className="w-32 mt-5">
            <img src={logo} alt="" />
          </div>
          <span className="my-10 text-3xl text-black font-bold">Login</span>
          <div className="w-full flex flex-col gap-3 ">
            <div className="w-full flex justify-center flex-col items-center">
              <label htmlFor="" className="w-5/6 font-bold text-black">
                Username
              </label>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                // onChange={formik.handleChange}
                // value={formik.values.email}
                className="input input-bordered w-5/6 glass shadow-md text-black"
              />
            </div>
            <div className="w-full flex justify-center flex-col items-center">
              <label htmlFor="" className="w-5/6 font-bold text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Type here"
                // onChange={formik.handleChange}
                // value={formik.values.password}
                className="input input-bordered w-5/6 glass shadow-md text-black"
              />
            </div>
            <div className="w-full flex justify-center my-5">
              <button
                className="btn btn-ghost bg-green-500 text-white w-5/6"
                // onClick={Login}
              >
                Login
                {/* {loading ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  "Login"
                )} */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
