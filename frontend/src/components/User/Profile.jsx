import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Profile = () => {
  const { isAuthorized, user, setUser, setIsAuthorized, theme, setTheme } = useContext(Context);
  const navigateTo = useNavigate();

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");
      toast.success(response.data.message);
    } catch {
      toast.error("Unable to logout cleanly. Logging out locally.");
    } finally {
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    }
  };

  return (
    <section className="page py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-950">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Update your account details and manage your theme preferences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Name</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{user?.name || "Not available"}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{user?.email || "Not available"}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Role</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{user?.role || "Job Seeker"}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Theme</p>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950"
              >
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Account actions</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Use the button below to sign out and protect your account on shared devices.
            </p>
            <button
              onClick={handleLogout}
              className="mt-6 rounded-3xl bg-rose-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-rose-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
