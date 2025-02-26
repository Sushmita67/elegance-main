import React from "react";
import { Link } from "react-router-dom";
import braceletBg from "../../assets/collections/home.png";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  document.title = "Elegance Jewellery";

  return (
    <AnimatePresence>
      <section className="px-5 py-4 lg:py-24 mt-10 flex flex-col lg:flex-row items-center justify-between lg:mx-20 xl:mx-28 2xl:mx-36 3xl:mx-auto lg:px-0 xl:px-3 max-w-xl md:max-w-xl mx-auto lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          id="hero-details"
          className="container order-2 lg:order-1 text-center lg:text-left mx-auto pt-5 sm:pt-10 lg:pt-5 pb-20 lg:pb-5 lg:px-0 xl:mr-1 w-full lg:w-1/2 relative z-[1]"
        >
          <h1 className="capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl sm:leading-none pb-1 sm:pb-5">
            Discover Your Dream Jewelry
          </h1>
          <p className="text-dark-grayish-blue lg:leading-6 py-6 lg:py-7">
            With a wide range of quality and affordable jewelry to choose from,
            browse through our collections for that perfect piece you've always wanted.
          </p>
          <Link to="products">
            <button className="w-full h-14 max-w-lg lg:max-w-none bg-black rounded-lg lg:rounded-xl mt-3 mb-2 text-white flex items-center justify-center lg:w-3/5 hover:bg-white shadow-[inset_0_0_0_0_rgba(255,125,26,0.6)] hover:shadow-[inset_0_-4rem_0_0_rgba(255,125,26,0.6)] transition-all duration-300 mx-auto lg:ml-0 lg:mr-auto">
              Explore Products
            </button>
          </Link>
        </motion.div>

        {/* Updated Background Image Section */}
        <motion.figure
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          className="order-1 lg:order-2 w-full lg:w-1/2 lg:ml-4 relative flex justify-center"
        >
          <div className="w-[100%] md:w-[85%] lg:w-[95%] xl:w-[75%]">
            <img
              src={braceletBg}
              alt="Bracelet background"
              className="w-full object-cover"
            />
          </div>
        </motion.figure>


      </section>
    </AnimatePresence>
  );
};

export default Hero;
