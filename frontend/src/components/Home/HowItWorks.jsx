import React from "react";
import {
  FaUserPlus,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create Account",
      description:
        "Sign up and build your professional profile to get started.",
    },
    {
      id: 2,
      icon: <FaSearch />,
      title: "Find Jobs",
      description:
        "Explore thousands of jobs from top companies worldwide.",
    },
    {
      id: 3,
      icon: <FaCheckCircle />,
      title: "Apply Easily",
      description:
        "Submit applications quickly and connect with recruiters.",
    },
  ];

  return (
    <section className="howitworks">
      <div className="container">
        <div className="heading">
          <h2>How CareerConnect Works</h2>
          <p>
            Get started with your career journey in just a few simple steps.
          </p>
        </div>

        <div className="banner">
          {steps.map((step) => (
            <div className="card" key={step.id}>
              <div className="icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;