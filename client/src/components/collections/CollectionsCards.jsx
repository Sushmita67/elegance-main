import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsByCollection } from '../../redux/reducers/productSlice';
import Cartier from '../../assets/collections/cartier-logo.png'; 
import Tiffany from '../../assets/collections/tiffany-logo.png';
import Pandora from '../../assets/collections/Pandora-Logo.png';
import Swarovski from '../../assets/collections/swarovski-logo.png';
import LV from '../../assets/collections/lv-logo.png'; 
import Dior from '../../assets/collections/dior-logo.png'; 

const CollectionsCards = () => {
  const dispatch = useDispatch();

  return (
    <div className='collections-wrapper flex flex-wrap mt-12 justify-center mb-3 lg:mb-12'>
      <Link to={`/collections/?collection=${'cartier'}`} onClick={() => dispatch(getProductsByCollection('cartier'))}>
        <div
          before='Cartier'
          className='w-[15rem] bg-pale-orange xl:w-[19.5rem] text-pale-orange text-xl md:text-2xl uppercase cursor-pointer h-48 xl:h-60 border border-grayish-blue rounded-md mx-4 mb-10 flex items-center justify-center relative after:content-[attr(before)] after:absolute after:flex after:w-full after:justify-center after:opacity-0 hover:after:opacity-100 before:absolute before:bg-[rgba(255,_125,_27,_0.9)] before:inset-0 text-center before:h-0 hover:before:h-full before:transition-all'
        >
          <picture className='mx-auto'>
            <img src={Cartier} alt='cartier logo' className='p-4 xl:p-0' />
          </picture>
        </div>
      </Link>
      <Link to={`/collections/?collection=${'tiffany'}`} onClick={() => dispatch(getProductsByCollection('tiffany'))}>
        <div
          before='Tiffany'
          className='w-[15rem] bg-pale-orange xl:w-[19.5rem] text-pale-orange text-xl md:text-2xl uppercase cursor-pointer h-48 xl:h-60 border border-grayish-blue rounded-md mx-4 mb-10 flex items-center justify-center relative after:content-[attr(before)] after:absolute after:flex after:w-full after:justify-center after:opacity-0 hover:after:opacity-100 before:absolute before:bg-[rgba(255,_125,_27,_0.9)] before:inset-0 text-center before:h-0 hover:before:h-full before:transition-all'
        >
          <picture className='mx-auto'>
            <img src={Tiffany} alt='tiffany logo' className='p-4 xl:p-0' />
          </picture>
        </div>
      </Link>
      <Link to={`/collections/?collection=${'pandora'}`} onClick={() => dispatch(getProductsByCollection('pandora'))}>
        <div
          before='Pandora'
          className='w-[15rem] bg-pale-orange xl:w-[19.5rem] text-pale-orange text-xl md:text-2xl uppercase cursor-pointer h-48 xl:h-60 border border-grayish-blue rounded-md mx-4 mb-10 flex items-center justify-center relative after:content-[attr(before)] after:absolute after:flex after:w-full after:justify-center after:opacity-0 hover:after:opacity-100 before:absolute before:bg-[rgba(255,_125,_27,_0.9)] before:inset-0 text-center before:h-0 hover:before:h-full before:transition-all'
        >
          <picture className='mx-auto'>
            <img src={Pandora} alt='pandora logo' className='p-4 xl:p-0' />
          </picture>
        </div>
      </Link>
      <Link to={`/collections/?collection=${'swarovski'}`} onClick={() => dispatch(getProductsByCollection('swarovski'))}>
        <div
          before='Swarovski'
          className='w-[15rem] bg-pale-orange xl:w-[19.5rem] text-pale-orange text-xl md:text-2xl uppercase cursor-pointer h-48 xl:h-60 border border-grayish-blue rounded-md mx-4 mb-10 flex items-center justify-center relative after:content-[attr(before)] after:absolute after:flex after:w-full after:justify-center after:opacity-0 hover:after:opacity-100 before:absolute before:bg-[rgba(255,_125,_27,_0.9)] before:inset-0 text-center before:h-0 hover:before:h-full before:transition-all'
        >
          <picture className='mx-auto'>
            <img src={Swarovski} alt='swarovski logo' className='p-4 xl:p-0' />
          </picture>
        </div>
      </Link>
      <Link to={`/collections/?collection=${'lv'}`} onClick={() => dispatch(getProductsByCollection('lv'))}>
        <div
          before='Louis Vuitton'
          className='w-[15rem] bg-pale-orange xl:w-[19.5rem] text-pale-orange text-xl md:text-2xl uppercase cursor-pointer h-48 xl:h-60 border border-grayish-blue rounded-md mx-4 mb-10 flex items-center justify-center relative after:content-[attr(before)] after:absolute after:flex after:w-full after:justify-center after:opacity-0 hover:after:opacity-100 before:absolute before:bg-[rgba(255,_125,_27,_0.9)] before:inset-0 text-center before:h-0 hover:before:h-full before:transition-all'
        >
          <picture className='mx-auto'>
            <img src={LV} alt='louis vuitton logo' className='p-4 xl:p-0' />
          </picture>
        </div>
      </Link>
      <Link to={`/collections/?collection=${'dior'}`} onClick={() => dispatch(getProductsByCollection('dior'))}>
        <div
          before='Dior'
          className='w-[15rem] bg-pale-orange xl:w-[19.5rem] text-pale-orange text-xl md:text-2xl uppercase cursor-pointer h-48 xl:h-60 border border-grayish-blue rounded-md mx-4 mb-10 flex items-center justify-center relative after:content-[attr(before)] after:absolute after:flex after:w-full after:justify-center after:opacity-0 hover:after:opacity-100 before:absolute before:bg-[rgba(255,_125,_27,_0.9)] before:inset-0 text-center before:h-0 hover:before:h-full before:transition-all'
        >
          <picture className='mx-auto'>
            <img src={Dior} alt='dior logo' className='p-4 xl:p-0' />
          </picture>
        </div>
      </Link>
    </div>
  );
};

export default CollectionsCards;