import { LogoSade } from "../assets";
import * as y from "yup";
import Store from "../store/Store";
import { useFormik } from "formik";
import Input from "../Component/Form/Input";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Auth } from "../midleware/Api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schema = y.object().shape({
  email: y.string().email("Format tidak valid").required("Wajid diisi"),
  password: y.string().min(6, "Minimal 6 karakter").required("Wajib diisi"),
});

const Login = () => {
  const { setUser, setToken } = Store();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (v, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const res = await Auth.Login(v.email, v.password);
        setToken(res.data.tokens.access.token);
        setUser(res.data.data);

        navigate("/guru/lesson-plan");
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: error.response?.data?.message ?? "",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-screen flex min-h-screen bg-base-300">
      <div className="m-auto p-8 bg-base-100 rounded-xl w-full max-w-md">
        <div className="flex gap-4 items-center">
          <img src={LogoSade} className="size-12" />
          <h3 className="text-2xl font-bold">Management</h3>
        </div>

        <form onSubmit={form.handleSubmit} className="mt-8">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            errorMessage={form.errors.email}
          />
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.values.password}
            onChange={form.handleChange}
            errorMessage={form.errors.password}
            slotRight={
              <button
                type="button"
                className="btn btn-square btn-sm btn-ghost"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          <button type="submit" className="btn w-full btn-primary mt-8">
            {form.isSubmitting ? "Login..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
