import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (

    <div className=" flex relative z-20 items-center overflow-hidden">
      <div className="container flex-col sm:flex-row mx-auto px-4 md:px-6 flex relative justify-between py-10 md:py-16 sm:items-center">
        <div className="sm:w-[60%] md:w-[60%] lg:w-2/4 flex flex-col relative z-20 items-center sm:items-start text-center sm:text-left">
          <span className="w-20 h-1 sm:h-2 bg-gray-800 dark:bg-white sm:mb-12 mb-5"></span>
          <h1 className="font-bebas-neue uppercase text-3xl sm:text-4xl md:text-[2.9rem] font-black flex flex-col leading-none md:leading-[3.5rem] dark:text-white text-gray-800">
           We Care About
            <span className="text-3xl sm:text-4xl md:text-[2.9rem]">Daily Load</span>
          </h1>
          <p className="text-sm w-[90%] sm:w-full sm:text-base mt-4 sm:mt-8 text-gray-700 dark:text-white">
            Dimension of reality that makes change possible and understandable.
            An indefinite and homogeneous environment in which natural events
            and human existence take place.
          </p>
          <div className="flex mt-8">
            <Link
              href="/shop"
              className="py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-rose-500 border-2 border-transparent text-white text-md mr-4 hover:bg-rose-700  duration-300"
            >
              Shop Now
            </Link>
          
          </div>
        </div>
        <div className="mt-10 sm:mt-0 sm:block sm:w-[45%] lg:w-2/4 relative">
          <Image
            src={"/nobg.png"}
            className="max-w-[60vw] sm:max-w-xs lg:max-w-lg m-auto"
            alt="hero-bag"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
