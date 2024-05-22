import React from 'react';
import { Bouquet, CEO, CandelAndBouquet, Fresheners } from '../assets/about';
import { Link } from 'react-router-dom';

const Aboutus = () => {
  const items = [
    {
      title: "Exquisite Floral Arrangements",
      img: Bouquet,
      description: "At Flosun, we are passionate about creating stunning floral arrangements that captivate the senses and elevate any occasion. Our talented team of florists meticulously handcrafts each bouquet, selecting only the freshest and most vibrant blooms. From classic roses to exotic orchids, we offer a wide variety of flowers to suit every taste and style."
    },
    {
      title: "Unparalleled Quality and Freshness",
      img: CandelAndBouquet,
      description: "We take great pride in the quality and freshness of our flowers. By sourcing directly from trusted farms and suppliers, we ensure that each flower reaches you at the peak of its beauty. Our state-of-the-art facilities and expert handling techniques guarantee that your bouquet will remain fresh and stunning for days to come."
    },
    {
      title: "Spreading Joy and Love",
      img: Fresheners,
      description: "At Flosun, we believe in the power of flowers to convey emotions and spread joy. Whether you're expressing love, gratitude, or sympathy, our carefully curated bouquets are the perfect way to send a heartfelt message. We are dedicated to providing exceptional service and creating unforgettable experiences for our customers."
    }
  ];

  return (
    <div className='w-full'>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-r border-black p-5 md:p-20 flex justify-center items-center flex-col gap-4">
          <p className='text-4xl md:text-6xl tracking-wider font-semibold'>Our Story</p>
          <p className={`text-4xl md:text-6xl font-['Ballet'_,cursive] my-3`}>About</p>
          <p className='text-4xl md:text-6xl tracking-wider font-semibold'>Flosun</p>
          <p className='px-10 md:px-40 text-center'>Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our Online Flower Delivery Service</p>
        </div>
        <div className="w-full h-full md:h-[850px] aspect-square filter contrast-75 grayscale-[30%]">
          <img src={CEO} alt="" className='w-full h-full object-cover aspect-square mx-auto block' />
        </div>
      </div>
      <div className="w-full border-b border-black p-5 md:p-20 flex flex-col justify-center items-center gap-4">
        <span className='uppercase'>Service</span>
        <h1 className='md:text-4xl text-2xl tracking-wide font-semibold mb-5'>Flower Subscriptions</h1>
        <p className='md:w-[600px] text-center'>Bring the beauty of flowers into your life or surprise your loved ones with our convenient flower subscription service. Choose from weekly, bi-weekly, or monthly deliveries of our expertly crafted bouquets, tailored to your preferences. With Flosun's subscription, you'll always have a fresh and enchanting floral arrangement to brighten up your space.</p>
      </div>
      {items.map((item, index) => (
        <div className="grid grid-cols-1 md:grid-cols-2" key={index}>
          <div className={`w-full h-full object-center md:h-[800px] aspect-square filter contrast-75 grayscale-[30%] ${index === 1 ? 'order-2' : ''}`}>
            <img src={item.img} alt="" className='w-full h-full object-cover' />
          </div>
          <div className="md:p-20 border-x border-black flex flex-col justify-start">
            <h1 className='md:text-4xl text-2xl tracking-wide font-semibold mb-5'>{item.title}</h1>
            <p className='md:w-[600px]'>{item.description}</p>
          </div>
        </div>
      ))}
      <div className="w-full h-full flex items-center justify-center p-5 md:p-20 text-center text-black border-x border-black">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className='md:text-5xl text-3xl tracking-wide font-semibold mb-5'>Discover Our Beautiful Bouquets</h1>
          <p>Explore our collection of exquisite bouquets and surprise your loved ones with the perfect gift. Click the button below to start shopping</p>
          <Link to={"/plant-shop/shop"} className='max-w-[70%] w-[50%] lg:w-[30%] uppercase px-5 py-3 text-white transition-all border border-black bg-black hover:bg-transparent hover:text-black mt-14'>shop now</Link>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;