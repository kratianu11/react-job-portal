import React, { useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get("/job/getall");
        const list = response.data?.jobs || response.data || [];
        setJobs(Array.isArray(list) ? list : []);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Unable to load jobs right now. Please refresh."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("careerConnectSavedJobs") || "[]"
    );
    setSavedJobs(saved);
  }, []);

  const jobsList = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !lowerQuery ||
        [job.title, job.category, job.country, job.city, job.location, job.description]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(lowerQuery));

      const matchesCategory = !category || job.category === category;
      const matchesLocation = !location || job.country === location || job.city === location;
      const matchesSalary =
        !salaryRange ||
        (salaryRange === "low" && job.salaryTo <= 50000) ||
        (salaryRange === "mid" && job.salaryTo > 50000 && job.salaryTo <= 120000) ||
        (salaryRange === "high" && job.salaryTo > 120000);

      return matchesQuery && matchesCategory && matchesLocation && matchesSalary;
    });
  }, [jobs, query, category, location, salaryRange]);

  const categories = useMemo(
    () => [...new Set(jobs.map((job) => job.category).filter(Boolean))],
    [jobs]
  );

  const locations = useMemo(
    () => [...new Set(jobs.map((job) => job.country || job.city).filter(Boolean))],
    [jobs]
  );

  const toggleSaveJob = (job) => {
    const isSaved = savedJobs.some((item) => item._id === job._id);
    const updated = isSaved
      ? savedJobs.filter((item) => item._id !== job._id)
      : [...savedJobs, job];

    localStorage.setItem("careerConnectSavedJobs", JSON.stringify(updated));
    setSavedJobs(updated);
    window.dispatchEvent(new Event("storage"));
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="jobs page py-12">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              All Available Jobs
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Smart search, filters, and saved job tracking for professional job seekers.
            </p>
          </div>
          <Link
            to="/saved-jobs"
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
          >
            View Saved Jobs ({savedJobs.length})
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, skills, companies..."
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="">Anywhere</option>
            {locations.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="">Any Salary</option>
            <option value="low">Up to 50K</option>
            <option value="mid">50K - 120K</option>
            <option value="high">120K+</option>
          </select>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse rounded-3xl bg-slate-200 p-8 dark:bg-slate-700" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400 bg-rose-50 p-6 text-rose-700 dark:border-rose-600 dark:bg-rose-900/20 dark:text-rose-200">
            {error}
          </div>
        ) : jobsList.length === 0 ? (
          <div className="rounded-3xl border border-slate-300 bg-white p-8 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="text-lg font-semibold">No jobs matched your search.</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing the search keywords or removing some filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobsList.map((element) => {
              const isSaved = savedJobs.some((item) => item._id === element._id);
              return (
                <article
                  key={element._id}
                  className="card flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.15em] text-sky-700 dark:text-sky-300">
                      <span>{element.category || "General"}</span>
                      <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700 dark:bg-sky-800/60 dark:text-sky-200">
                        {element.country}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {element.title}
                    </h2>
                    <p className="max-h-20 overflow-hidden text-sm text-slate-600 dark:text-slate-400">
                      {element.description || "No description provided."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to={`/job/${element._id}`}
                      className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                    >
                      View details
                    </Link>
                    <button
                      onClick={() => toggleSaveJob(element)}
                      className={`rounded-2xl px-4 py-2 text-sm text-white transition ${
                        isSaved
                          ? "bg-rose-600 hover:bg-rose-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {isSaved ? "Remove Saved" : "Save"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
