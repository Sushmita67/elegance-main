import React from "react"; 
import ContactVideo from "../assets/page-header/contact_uss.mp4";

const Contact = () => {
  document.title = "Contact Page";

  return (
    <section className="bg-light-grayish-blue h-auto pt-2 min-h-[100vh]">
      <div className="max-w-xl sm:max-w-4xl lg:max-w-7xl relative px-5 pt-24 pb-12 items-center mx-auto lg:mx-20 xl:mx-28 2xl:mx-40 3xl:mx-auto lg:pb-2 lg:px-1 xl:px-3 2xl:px-1">
        
        {/* Contact Header */}
        <h2 className="text-white font-bold text-center lg:text-left text-4xl sm:text-5xl leading-tight pb-20 relative z-[1]">
          Contact Us
        </h2>
        <div className="absolute top-0 left-0 w-full h-[400px] rounded-md overflow-hidden bg-dark-grayish-blue">
          <video autoPlay loop muted className="absolute w-full h-full object-cover">
            <source src={ContactVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Contact Details & Support Info */}
        <div className="flex flex-col lg:flex-row mt-48 bg-pale-orange shadow-xl rounded-lg mx-auto p-6 sm:p-10 lg:p-12">
          <div className="text-very-dark-blue text-base lg:text-lg flex-1">
            
            {/* Customer Support Section */}
            <h2 className="text-2xl font-bold mb-4">Customer Support</h2>
            <p className="mb-2">Our customer support team is available Monday through Friday, 9am to 5pm EST.</p>
            <p className="mb-6">
              We strive to respond to all inquiries within 1-2 business days. For urgent matters, please call our support line.
            </p>

            {/* Contact Information */}
            <ul className="space-y-4 text-dark-grayish-blue text-sm lg:text-lg">
              <li className="flex items-center space-x-3">
                <ion-icon name="location" class="text-very-dark-blue"></ion-icon>
                <p><strong>Elegance Affair,</strong> Kathmandu, Nepal</p>
              </li>
              <li className="flex items-center space-x-3">
                <ion-icon name="call" class="text-very-dark-blue"></ion-icon>
                <p>9827111620</p>
              </li>
              <li className="flex items-center space-x-3">
                <ion-icon name="mail" class="text-very-dark-blue"></ion-icon>
                <p>eleganceaffair@gmail.com</p>
              </li>
            </ul>

            {/* Support Message */}
            <p className="mt-8 text-lg font-medium leading-relaxed">
              Have a question, comment, or concern about our products or services? We're here to help. 
              Feel free to reach out to our team and we'll get back to you as soon as possible.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
