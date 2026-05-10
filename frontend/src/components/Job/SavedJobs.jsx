import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { useContext } from "react";

const SavedJobs = () => {
  const { isAuthorized } = useContext(Context);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("careerConnectSavedJobs") || "[]");
    setSavedJobs(jobs);
  }, []);

  const handleRemove = (id) => {
    const updated = savedJobs.filter((job) => job._id !== id);
    localStorage.setItem("careerConnectSavedJobs", JSON.stringify(updated));
    setSavedJobs(updated);
    window.dispatchEvent(new Event("storage"));
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Saved Jobs</h1>
        {savedJobs.length === 0 ? (
          <div className="banner">
            <p>No saved jobs yet.</p>
            <Link to="/job/getall" className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="banner grid gap-6 md:grid-cols-2">
            {savedJobs.map((job) => (
              <div key={job._id} className="card flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-300">{job.category} • {job.country}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-200">
                  <span>{job.city}</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/job/${job._id}`}
                    className="rounded-xl bg-white px-4 py-2 text-black transition hover:bg-gray-200"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemove(job._id)}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedJobs;
