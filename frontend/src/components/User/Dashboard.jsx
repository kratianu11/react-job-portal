import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

const Dashboard = () => {
  const { isAuthorized, user } = useContext(Context);
  const [savedCount, setSavedCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("careerConnectSavedJobs") || "[]");
    setSavedCount(saved.length);
    const applications = JSON.parse(localStorage.getItem("careerConnectApplications") || "[]");
    setApplicationsCount(applications.length);
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page py-16">
      <div className="container">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-950">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Welcome back, {user?.name || user?.email || "talented candidate"}.
              </p>
            </div>
            <div className="inline-flex gap-3">
              <Link
                to="/saved-jobs"
                className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Saved Jobs
              </Link>
              <Link
                to="/applications/me"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-900"
              >
                Applications
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Saved jobs</p>
              <p className="mt-4 text-4xl font-bold">{savedCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Applications</p>
              <p className="mt-4 text-4xl font-bold">{applicationsCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Role</p>
              <p className="mt-4 text-4xl font-bold">{user?.role || "Job Seeker"}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
              <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-400">
                <li>• Use the search and filters on Jobs to zero in on the perfect role.</li>
                <li>• Save jobs for later and access them from Saved Jobs.</li>
                <li>• Track applications and profile details from your account.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your profile summary</h2>
              <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{user?.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{user?.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Member since</p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
