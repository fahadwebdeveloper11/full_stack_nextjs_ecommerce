"use client";
import { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { store } from "@/lib/store";
import axios from "axios";
import { Provider } from "react-redux";
import { Navigation } from "swiper/modules";
import Card from "../common/Card/Card";
import SkeletonCard from "../common/SkeletonCard";
const TrendingProduct = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    register();
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/product/trending-products");
        setTrendingProducts(res.data.products);
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <div className="px-[10px] md:px-10">
      <h1 className="text-3xl md:text-4xl md:text-left text-center font-semibold my-2">
        Trending Products
      </h1>
      <div className="py-8 md:pb-20">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          navigation
          loop
          modules={[Navigation]}
          className="mySwiper w-full h-full"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {isLoading ? (
            <>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <SwiperSlide key={i}>
                    <SkeletonCard />
                  </SwiperSlide>
                ))}
            </>
          ) : (
            trendingProducts?.map((item, i) => (
              <SwiperSlide className="sm:justify-center justify-start" key={i}>
                <Provider store={store}>
                  <Card item={item} />
                </Provider>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingProduct;
