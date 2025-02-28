import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-14 px-6 md:px-14 rounded-t-2xl w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">

        {/* Left Section: Logo & Socials */}
        <div className="text-center md:text-left">
          <a href="/" className="text-xl font-bold whitespace-nowrap">
            Elegance Affair
          </a>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <Link
              to="https://shorturl.at/b9j9V"
              target="_blank"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </Link>
            <Link
              to="https://github.com/Sushmita67/elegance-main"
              target="_blank"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <nav className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
          <ul className="text-center sm:text-left">
            <li className="mb-2 hover:text-[#FFD700]">
              <Link to="/collections">Collections</Link>
            </li>
            <li className="mb-2 hover:text-[#FFD700]">
              <Link to="/about-us">About us</Link>
            </li>
            <li className="hover:text-[#FFD700]">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <ul className="text-center sm:text-left">
            <li className="mb-2 hover:text-[#FFD700]">
              <Link to="/products">Products</Link>
            </li>
            <li className="mb-2 hover:text-[#FFD700]">
              <Link to="/products/men">Men</Link>
            </li>
            <li className="hover:text-[#FFD700]">
              <Link to="/products/women">Women</Link>
            </li>
          </ul>
        </nav>


        {/* Right Section: Copyright */}
        <div className="text-center md:text-left text-sm text-gray-400 space-y-1">
          <p>© 2025 All Rights Reserved.</p>
          <p>Elegance Affair by Sushmita Bishwakarma</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
