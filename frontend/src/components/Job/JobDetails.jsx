import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get(`/job/${id}`);
        setJob(response.data.job || {});
      } catch (fetchError) {
        setError("Job details could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    const savedJobs = JSON.parse(
      localStorage.getItem("careerConnectSavedJobs") || "[]"
    );
    setSaved(savedJobs.some((item) => item._id === id));
  }, [id]);

  const toggleSaveJob = () => {
    if (!job?._id) return;

    const savedJobs = JSON.parse(
      localStorage.getItem("careerConnectSavedJobs") || "[]"
    );
    const exists = savedJobs.some((item) => item._id === id);

    const updated = exists
      ? savedJobs.filter((item) => item._id !== id)
      : [...savedJobs, job];

    localStorage.setItem("careerConnectSavedJobs", JSON.stringify(updated));
    setSaved(!exists);
    window.dispatchEvent(new Event("storage"));
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <section className="page py-16">
        <div className="container">
          <div className="rounded-3xl bg-slate-200 p-10 dark:bg-slate-800">
            <div className="h-6 w-1/3 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-3xl bg-slate-300 dark:bg-slate-700"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="jobDetail page py-16">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{job.title || "Job Details"}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {job.category || "Category not specified"} • {job.country || "Location not specified"}
            </p>
          </div>
          <Link
            to="/job/getall"
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900"
          >
            Back to jobs
          </Link>
        </div>

        {error ? (
          <div className="rounded-3xl border border-rose-400 bg-rose-50 p-8 text-rose-700 dark:border-rose-600 dark:bg-rose-900/20 dark:text-rose-200">
            {error}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.75fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                    Job Overview
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">About the Role</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-7">
                    {job.description || "No detailed description is available for this posting."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Posted On
                    </p>
                    <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                      {job.jobPostedOn || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Salary
                    </p>
                    <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                      {job.fixedSalary
                        ? job.fixedSalary
                        : job.salaryFrom && job.salaryTo
                        ? `${job.salaryFrom} - ${job.salaryTo}`
                        : "Negotiable"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Role Snapshot</h3>
                <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <span>City</span>
                    <strong>{job.city || "Remote / not set"}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <span>Location</span>
                    <strong>{job.location || "N/A"}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <span>Category</span>
                    <strong>{job.category || "General"}</strong>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                <div className="space-y-4">
                  {user && user.role !== "Employer" && (
                    <Link
                      to={`/application/${job._id}`}
                      className="block rounded-2xl bg-sky-600 px-5 py-3 text-center text-white transition hover:bg-sky-700"
                    >
                      Apply Now
                    </Link>
                  )}
                  <button
                    onClick={toggleSaveJob}
                    disabled={!job._id}
                    className={`w-full rounded-2xl px-5 py-3 text-white transition ${
                      saved
                        ? "bg-rose-600 hover:bg-rose-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    } ${!job._id ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {saved ? "Remove from Saved" : "Save Job"}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
