import React from "react";
import ContactHeader from "../assets/page-header/contact-header.jpg";

const Contact = () => {
  document.title = "Contact Page"

  return (
    <section className="bg-light-grayish-blue h-auto pt-2 min-h-[80vh]">
      <div className="max-w-xl sm:max-w-4xl lg:max-w-7xl relative px-5 pt-20 pb-12 items-center mx-auto lg:mx-20 xl:mx-28 2xl:mx-40 3xl:mx-auto lg:pb-2 lg:px-1 xl:px-3 2xl:px-1">
        <h2 className="product capitalize text-white font-bold text-center relative z-[1] lg:text-left text-3xl sm:text-4xl sm:leading-none pb-3 px-8">
          Contact
        </h2>
        <div className="absolute top-0 left-0 bg-dark-grayish-blue w-full h-48 rounded-md overflow-hidden">
          <img
            src={ContactHeader}
            alt="sneakers on a line"
            className="opacity-10 absolute h-full w-full object-cover"
          />
        </div>

        <div className="flex mt-32 bg-pale-orange shadow-xl flex-col lg:flex-row max-w-xl lg:max-w-7xl mx-auto mb-32">
          <div className="other-contact flex-1 lg:mr-6 text-very-dark-blue text-base lg:text-2xl px-3 sm:px-5 lg:px-8 py-4 lg:py-16">
            <p className="font-bold">Got questions or feedbacks for us?</p>
            <p className="font-bold">Fill the form here to reach us.</p>

            <ul className="contact-details mt-8 lg:mt-20 text-dark-grayish-blue text-sm lg:text-lg">
              <li className="w-full flex items-center mb-4">
                <ion-icon
                  name="location"
                  class="text-very-dark-blue"
                ></ion-icon>
                <p className="font-bold ml-2 sm:ml-4">
                 Sole Seekers,{" "}
                  <span className="font-normal">Kathmandu ,Nepal</span>
                </p>
              </li>
              <li className="w-full flex items-center mb-4">
                <ion-icon name="call" class="text-very-dark-blue"></ion-icon>
                <p className="ml-2 sm:ml-4">(061)-551252</p>
              </li>
              <li className="w-full flex items-center mb-4">
                <ion-icon name="mail" class="text-very-dark-blue"></ion-icon>
                <p className="ml-2 sm:ml-4">help@soleseekers.com</p>
              </li>
            </ul>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default Contact;
