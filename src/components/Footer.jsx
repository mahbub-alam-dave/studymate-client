import React from "react";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] px-4 sm:px-5 md:px-6">
      <footer className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] py-10 ">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
          <aside className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <PiStudent
                size={36}
                className="text-2xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]"
              />
              <span className="rancho font-medium text-3xl text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">
                Edumate
              </span>
            </div>
            <div className="flex flex-col gap-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-primary-dark)]">
              <p className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] text-lg">Learn, grow, and achieve together with EduMate — your trusted study companion <br /> that makes learning simpler, smarter, and more fun.</p>
              <p className="flex itmes-center gap-2">
                <span className="font-semibold"><FaMapMarkerAlt /></span> 432, Kajipara, Dhaka (near South Marraige Registry
                office
              </p>
              <p className="flex items-center gap-2"><span className="font-semibold"><FaPhoneSquare /></span> +08252526</p>
              <p className="flex items-center gap-2"><span className="font-semibold"><MdEmail /></span> studymate@gmail.com</p>
            </div>
          </aside>

          <div className="flex flex-col md:justify-end justify-self-end gap-4 ">
            <div className="join">
              <div>
                <label className="input validator join-item dark:bg-gray-800">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input type="email bg-transparent" placeholder="mail@site.com" required />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>
              <button className="btn text-[var(--color-text-primary-dark)] join-item bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)]">Subscribe</button>
            </div>
            <ul className="flex md:flex-row flex-wrap gap-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              <li>
                <Link className="hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">Home</Link>
              </li>
              <li className="hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
                <Link>Blogs</Link>
              </li>
              <li className="hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
                <Link>About Us</Link>
              </li>
              <li className="hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
                <Link>Contact</Link>
              </li>
              <li className="hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
                <Link>Privacy Policy</Link>
              </li>
            </ul>
            <div className="flex gap-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
          <a href="https://www.linkedin.com/in/md-mahabub-alam-web-dave/">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/mahbub-alam-dave/">
            <FaGithub size={24} />
          </a>
          <a href="https://facebook.com/">
            <FaFacebook size={24} />
          </a>
        </div>
          </div>
        </div>
        {/* <div className="flex gap-6 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] md:justify-center pb-5 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
          <a href="">
            <FaLinkedin size={24} />
          </a>
          <a href="">
            <FaGithub size={24} />
          </a>
          <a href="">
            <FaFacebook size={24} />
          </a>
        </div> */}
        <div className="flex justify-between text-sm text-gray-500 pt-5 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <p className="">
            Copyright © {new Date().getFullYear()} - All right reserved by Study
            Mate
          </p>
          <p>Powered By: Edumate</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
