import React, { useContext } from "react";
import { Context } from "../../main";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) return null;

  return (
    <footer className="bg-black px-6 py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
        
        <p className="text-sm text-gray-400">
          © 2025 CareerConnect. All rights reserved.
        </p>

        <div className="flex items-center gap-5 text-2xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gray-400"
          >
            <FaGithub />
          </a>

          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-yellow-400"
          >
            <SiLeetcode />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-400"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-pink-400"
          >
            <RiInstagramFill />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;