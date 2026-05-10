import React from "react";

import {
  FaBuilding,
  FaSuitcase,
  FaUsers,
  FaUserPlus,
} from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441+",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220+",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200+",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761+",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] text-gray-900">

      {/* GRADIENT EFFECT */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        {/* HERO CONTENT */}
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              #1 Modern Job Portal Platform
            </p>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dream Job
              </span>{" "}
              Faster Than Ever
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-gray-400">
              Discover thousands of opportunities from top companies.
              Build your career with a modern job platform designed
              for ambitious professionals.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">

              <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200">
                Explore Jobs
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-lg transition hover:bg-white/10">
                Post a Job
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <img
              src="/heroS.jpg"
              alt="hero"
              className="w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {details.map((element) => (
            <div
              key={element.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30"
            >

              <div className="mb-4 text-3xl text-cyan-400">
                {element.icon}
              </div>

              <h2 className="text-3xl font-bold">
                {element.title}
              </h2>

              <p className="mt-2 text-gray-400">
                {element.subTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;