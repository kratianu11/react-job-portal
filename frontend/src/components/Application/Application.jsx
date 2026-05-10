import axiosInstance from "../../api/axiosInstance";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const validateFile = (file) => {
    if (!file) return "Please upload your resume.";
    if (!allowedTypes.includes(file.type)) {
      return "Please upload PNG, JPEG, WEBP, PDF, DOC, or DOCX.";
    }
    if (file.size > 4 * 1024 * 1024) {
      return "File size should be less than 4MB.";
    }
    return "";
  };

  const handleFileChange = (file) => {
    setFileError("");
    const validationMessage = validateFile(file);
    if (validationMessage) {
      setFileError(validationMessage);
      setResume(null);
      return;
    }
    setResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!resume) {
      setFileError("Please upload your resume.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axiosInstance.post("/application/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error("File upload service is temporarily unavailable.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-950">
          <h3 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Apply for this role</h3>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Submit your details and upload a resume. Drag and drop your resume file or choose it manually.
          </p>
          <form onSubmit={handleApplication} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <textarea
              placeholder="Cover Letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[180px] w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDrop}
              className={`rounded-3xl border-2 px-6 py-8 text-center transition ${
                dragActive
                  ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-slate-900"
                  : "border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-950"
              }`}
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-white">Drag & drop your resume here</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                PDF, DOC, DOCX, PNG, JPEG, WEBP up to 4MB.
              </p>
              <label className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950">
                Choose file
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </div>

            {resume && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                <p className="font-medium">Selected file:</p>
                <p className="mt-2 text-sm">{resume.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{(resume.size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            {fileError && (
              <p className="rounded-3xl bg-rose-100 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-200">
                {fileError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-sky-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting your application..." : "Send Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;
