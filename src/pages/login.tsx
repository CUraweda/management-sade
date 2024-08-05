import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../midleware/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginStore } from "../store/Store";
import Swal from "sweetalert2";
import logo from "../assets/sade.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = Yup.object({
  email: Yup.string().required("Email required").email("Invalid email format"),
  password: Yup.string().required("Password required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setRole } = LoginStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const emailLower = values.email.toLowerCase();
        const response = await Auth.Login(emailLower, values.password);
        const role = response.data.data.role_id;
        setRole(role.toString());

        if (role) {
          setToken(response.data.tokens.access.token);
          if (role === 10) {
            navigate("/admin/home");
          } else {
            navigate("/petugas/data");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Your account does not have access!",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Please make sure your username and password are correct!",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full bg-color-4 flex justify-center items-center min-h-screen">
      <div className="w-full sm:w-1/4 bg-white shadow-md rounded-md flex justify-center items-center p-3 flex-col">
        <div className="w-32 mt-5">
          <img src={logo} alt="Logo" />
        </div>
        <span className="my-10 text-3xl text-black font-bold">Login</span>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-3"
        >
          <div className="w-full flex justify-center flex-col items-center">
            <label htmlFor="email" className="w-5/6 font-bold text-black">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Type here"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="input input-bordered w-5/6 glass shadow-md text-black"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="w-5/6 text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="w-full flex justify-center flex-col items-center relative">
            <label htmlFor="password" className="w-5/6 font-bold text-black">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Type here"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="input input-bordered w-5/6 glass shadow-md text-black pr-10" // Added padding for icon
            />
            <button
              type="button"
              className="absolute right-10 top-[3rem] transform -translate-y-1/2"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash size="1.5rem" />
              ) : (
                <FaEye size="1.5rem" />
              )}{" "}
            </button>
            {formik.errors.password && formik.touched.password ? (
              <div className="w-5/6 text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="w-full flex justify-center my-5">
            <button
              className="btn btn-ghost bg-green-500 text-white w-5/6"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
