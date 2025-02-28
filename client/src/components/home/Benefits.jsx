import React from "react"; 
import diamond from "../../assets/collections/diamond.png";
import shipping from "../../assets/collections/shipping.png";
import priceTag from "../../assets/collections/jewelry.png";

const Benefits = () => {
  return (
    <section className="lg:mx-20 xl:mx-28 2xl:mx-36  3xl:mx-auto lg:px-0 xl:px-3 max-w-xl mx-auto lg:max-w-7xl mb-12 lg:mb-16 lg:mt-7">
      <h2 className="text-very-dark-blue font-bold w-fit border-t text-2xl text-center mx-auto lg:mx-0 lg:text-left sm:text-4xl sm:leading-none py-6 sm:pb-5 mb-6 lg:mb-9">
        Why Choose Us?
      </h2>
      <div
        id="benefits"
        className="flex flex-col lg:flex-row items-center justify-center"
      >
        <div className="detail px-4 mb-10 flex flex-col items-center text-center lg:text-left lg:items-start">
          <figure className="bg-[#FDE6BF] rounded-full w-16 h-16 flex items-center justify-center">
            <img src={shipping} alt="Fast Shipping" className="w-12" />
          </figure>
          <h3 className="text-very-dark-blue font-bold text-xl pt-5 pb-4">
            Secure & Fast Delivery
          </h3>
          <p className="text-grayish-blue text-base">
            Receive your jewelry quickly and securely. We ensure safe packaging and fast shipping right to your doorstep.
          </p>
        </div>
        <div className="detail px-4 mb-10 flex flex-col items-center text-center lg:text-left lg:items-start">
          <figure className="bg-[#FDE6BF] rounded-full w-16 h-16 flex items-center justify-center">
            <img src={priceTag} alt="Affordable Prices" className="w-12 mb-1" />
          </figure>
          <h3 className="text-very-dark-blue font-bold text-xl pt-5 pb-4">
            Affordable Luxury
          </h3>
          <p className="text-grayish-blue text-base">
            Get exquisite jewelry at unbeatable prices. No hidden charges—just pure elegance within your budget.
          </p>
        </div>
        <div className="detail px-4 mb-10 flex flex-col items-center text-center lg:text-left lg:items-start">
          <figure className="bg-[#FDE6BF] rounded-full w-16 h-16 flex items-center justify-center">
            <img src={diamond} alt="Premium Quality" className="w-12" />
          </figure>
          <h3 className="text-very-dark-blue font-bold text-xl pt-5 pb-4">
            Premium Craftsmanship
          </h3>
          <p className="text-grayish-blue text-base">
            Our jewelry is crafted with precision and care, using only the finest materials for timeless beauty.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
