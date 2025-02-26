// import React from "react";
// import AboutHeader from "../assets/page-header/about-header.jpg";

// const About = () => {
//   return (
//     <section className="h-auto pt-2 min-h-[80vh]">
//       <div className="max-w-xl sm:max-w-4xl lg:max-w-7xl relative px-5 pt-20 pb-12 items-center mx-auto lg:mx-20 xl:mx-28 2xl:mx-40 3xl:mx-auto lg:pb-2 lg:px-1 xl:px-3 2xl:px-1">
//         <h2 className="product capitalize text-white font-bold text-center relative z-10 lg:text-left text-3xl sm:text-4xl sm:leading-none pb-3 px-8">
//           About Us
//         </h2>
//         <div className="absolute top-0 left-0 bg-dark-grayish-blue w-full h-48 rounded-md overflow-hidden">
//           <img
//             src={AboutHeader}
//             className="opacity-10 absolute h-full w-full object-cover"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;


import React from "react";
import aboutHeaderVideo from "../assets/page-header/ringss.mp4"; // Import the video file

export default function About() {
  // Update the page title
  document.title = `Emirates Elegance | About`;

  // Scroll top when click on Link
  function scrollTopFunc() {
    window.scrollTo({
      top: -10,
      behavior: "instant",
    });
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header */}
      <header className="relative bg-[#F5F5F5] mt-10 py-20 md:py-32 lg:py-40 sm:rounded-lg overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={aboutHeaderVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div>{" "}
        {/* Optional overlay for better text readability */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Emirates Elegance
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
            Elevate your senses with our exquisite collection of luxury jewelry,
            crafted with the finest and unparalleled attention to detail.
          </p>
        </div>
      </header>

      {/* About Emirates Elegance */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-5 mb-4">
                About Emirates Elegance
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Emirates Elegance is a luxury jewelry store in the UAE, offering
                an exclusive collection of exquisite pieces for discerning
                individuals. Our journey began with a deep passion for fine
                craftsmanship and a commitment to curating jewelry that evokes
                emotion, inspires confidence, and captures timeless elegance.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                At the heart of Emirates Elegance is a dedication to quality,
                artistry, and customer satisfaction. We source the finest
                materials from around the world, and our expert artisans
                meticulously craft each piece to ensure a harmonious and
                captivating design.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our mission is to elevate the art of jewelry, providing our
                customers with a truly luxurious and transformative experience.
                From the moment you discover an Emirates Elegance piece to the
                moment you wear it, we strive to create a connection that
                transcends the senses and leaves a lasting impression.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/about.jpg"
                alt="Emirates Elegance Jewelry"
                className="rounded-lg shadow-lg w-[500px] object-fill"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}