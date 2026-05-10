import React, { useContext, useState } from "react";
import {
  MdOutlineMailOutline,
} from "react-icons/md";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { FaRegUser } from "react-icons/fa";

import { Link, Navigate } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axiosInstance.post(
        "/user/login",
        { email, password, role }
      );

      toast.success(data.message);

      setEmail("");
      setPassword("");
      setRole("");

      setUser(data.user);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

return (
  <section className="min-h-screen bg-[#f8fafc] py-20 px-6">
  <div className="mx-auto grid max-w-7xl items-center gap-24 lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="w-full max-w-md">

        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-500">
            Login to continue your job search journey.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* ROLE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Login As
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-black">

              <FaRegUser className="text-gray-400" />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent px-3 text-sm text-gray-700 outline-none"
              >
                <option value="">
                  Select Role
                </option>

                <option value="Job Seeker">
                  Job Seeker
                </option>

                <option value="Employer">
                  Employer
                </option>
              </select>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-black">

              <MdOutlineMailOutline className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-black">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="text-xl text-gray-400"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-14 w-full rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="pt-2 text-center text-sm text-gray-500">
            Don’t have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-black hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 lg:justify-end">
        <img
          src="/login.png"
          alt="login"
          className="max-h-[650px] w-full max-w-xl object-contain"
        />
      </div>
    </div>
  </section>
);
};

export default Login;