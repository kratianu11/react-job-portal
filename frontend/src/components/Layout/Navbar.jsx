import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const { isAuthorized, setIsAuthorized, user, setUser, theme, setTheme } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("careerConnectSavedJobs") || "[]");
    setSavedCount(saved.length);
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const saved = JSON.parse(localStorage.getItem("careerConnectSavedJobs") || "[]");
      setSavedCount(saved.length);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logged out");
    } finally {
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          CareerConnect
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-gray-300 md:flex">
          {isAuthorized ? (
            <>
              <li>
                <Link
                  to="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/job/getall"
                  className="transition hover:text-white"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/saved-jobs"
                  className="transition hover:text-white flex items-center gap-2"
                >
                  <FiBookmark />
                  Saved {savedCount > 0 ? `(${savedCount})` : ""}
                </Link>
              </li>

              <li>
                <Link
                  to="/applications/me"
                  className="transition hover:text-white"
                >
                  {user?.role === "Employer"
                    ? "Applications"
                    : "My Applications"}
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="transition hover:text-white"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition hover:text-white"
                >
                  Profile
                </Link>
              </li>

              {user?.role === "Employer" && (
                <>
                  <li>
                    <Link
                      to="/job/post"
                      className="transition hover:text-white"
                    >
                      Post Job
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/job/me"
                      className="transition hover:text-white"
                    >
                      My Jobs
                    </Link>
                  </li>
                </>
              )}

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <BsSun /> : <BsMoon />}
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-white px-5 py-2 text-black transition hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="rounded-xl bg-white px-5 py-2 text-black transition hover:bg-gray-200"
                >
                  Register
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <BsSun /> : <BsMoon />}
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Icon */}
        <button
          className="text-2xl text-white md:hidden"
          onClick={() => setShow(!show)}
        >
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <ul className="flex flex-col gap-5 px-6 py-6 text-gray-300">
            {isAuthorized ? (
              <>
                <li>
                  <Link to="/" onClick={() => setShow(false)}>
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/job/getall" onClick={() => setShow(false)}>
                    Jobs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/applications/me"
                    onClick={() => setShow(false)}
                  >
                    {user?.role === "Employer"
                      ? "Applications"
                      : "My Applications"}
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard" onClick={() => setShow(false)}>
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/profile" onClick={() => setShow(false)}>
                    Profile
                  </Link>
                </li>

                {user?.role === "Employer" && (
                  <>
                    <li>
                      <Link to="/job/post" onClick={() => setShow(false)}>
                        Post Job
                      </Link>
                    </li>

                    <li>
                      <Link to="/job/me" onClick={() => setShow(false)}>
                        My Jobs
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link to="/saved-jobs" onClick={() => setShow(false)}>
                    Saved Jobs {savedCount > 0 ? `(${savedCount})` : ""}
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setShow(false);
                    }}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-white"
                  >
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-white py-3 text-black"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setShow(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setShow(false)}
                    className="block w-full rounded-xl bg-white px-4 py-3 text-center text-black"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setShow(false);
                    }}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-white"
                  >
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;