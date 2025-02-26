import React from 'react';
import CollectionsCards from '../components/collections/CollectionsCards';
import CollectionsHeaderVideo from '../assets/page-header/ringss.mp4'; // Import the video file

const Collections = () => {
  document.title = "Jewellery Collections";

  return (
    <section className='h-auto min-h-[80vh]'>
      <div className='max-w-xl sm:max-w-4xl lg:max-w-7xl relative px-5 pt-20 pb-12 items-center mx-auto lg:mx-20 xl:mx-28 2xl:mx-40 3xl:mx-auto lg:pb-2 lg:px-1 xl:px-3 2xl:px-1'>
        <h2 className='product capitalize text-white font-bold text-center relative z-[1] lg:text-left text-3xl sm:text-4xl sm:leading-none pb-16 px-8'>
          Collections
        </h2>
        <div className='absolute top-0 left-0 -z-0 bg-dark-grayish-blue w-full h-96 lg:rounded-md overflow-hidden'>
          <video
            autoPlay
            loop
            muted
            className='opacity-50 h-full w-full object-cover'
          >
            <source src={CollectionsHeaderVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='mt-96'> {/* Adjusted margin to move cards down */}
          <CollectionsCards />
        </div>
      </div>
    </section>
  );
};

export default Collections;