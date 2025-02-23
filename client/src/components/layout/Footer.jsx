import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white bg-very-dark-blue">
      <div className="wrapper px-5 py-12 lg:py-16 md:px-0 lg:mx-20 xl:mx-28 2xl:mx-40 3xl:mx-auto lg:pb-12 lg:px-1 xl:px-3 2xl:px-1  max-w-xl md:max-w-2xl mx-auto lg:max-w-7xl flex flex-col md:flex-row justify-center lg:justify-between items-center md:items-start">
        <div className="w-[138px] my-10 md:my-0">
          <div className="logo">
            <a href="/" className="cursor-pointer" aria-label="homepage">
              <h1>Mero jutta</h1>
            </a>
          </div>
          <div className="social flex justify-between items-center mt-4">
            <Link to="#" aria-label="facebook">
              <i className="text-2xl hover:text-orange fab fa-facebook-square"></i>
            </Link>
            <Link to="#" aria-label="youtube">
              <i className="text-2xl hover:text-orange fab fa-youtube"></i>
            </Link>
            <Link to="#" aria-label="twitter">
              <i className="text-2xl hover:text-orange fab fa-twitter"></i>
            </Link>
            <Link to="#" aria-label="instagram">
              <i className="text-2xl hover:text-orange fab fa-instagram"></i>
            </Link>
          </div>
        </div>
        <nav className="as flex flex-col sm:flex-row -mt-3 mb-10 md:mb-0 sm:px-10">
          <ul className="px-4">
            <li className="my-3 hover:text-orange w-fit sm:w-full mx-auto sm:mx-0">
              <a href="/collections" className="">
                Collections
              </a>
            </li>
            <li className="my-3 hover:text-orange w-fit sm:w-full mx-auto sm:mx-0">
              <a href="/about-us" className="">
                About us
              </a>
            </li>
            <li className="my-3 hover:text-orange w-fit sm:w-full mx-auto sm:mx-0">
              <a href="/contact" className="">
                Contact
              </a>
            </li>
          </ul>
          <ul className="px-4">
            <li className="my-3 hover:text-orange w-fit sm:w-full mx-auto sm:mx-0">
              <a href="/products" className="">
                Products
              </a>
            </li>
            <li className="my-3 hover:text-orange w-fit sm:w-full mx-auto sm:mx-0">
              <a href="/products/men" className="">
                Men
              </a>
            </li>
            <li className="my-3 hover:text-orange w-fit sm:w-full mx-auto sm:mx-0">
              <a href="/products/women" className="">
                Women
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright text-center md:text-left mb-8 md:mb-0">
          © Copyright 2022{" "}
          <a
            href="https://hikmah-yousuph.vercel.app/"
            className="border-bottom rounded-sm shadow-[inset_0_-1px_0_0_#fff] hover:shadow-[inset_0_-4rem_0_0_#ff7d1a] hover:text-very-dark-blue py-1 transition-all duration-300"
          >

          </a>{" "}
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
