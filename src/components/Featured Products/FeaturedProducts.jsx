"use client";

import { store } from "@/lib/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Card from "../common/Card/Card";
import SkeletonCard from "../common/SkeletonCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/product/featured-products");
        setFeaturedProducts(res.data.products);
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className=" px-[10px] md:px-10">
      <h1 className="text-3xl md:text-4xl font-semibold md:text-left text-center my-2">
        Featured Products
      </h1>
      <div className="py-8 md:pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </>
        ) : (
          <Provider store={store}>
            {featuredProducts.map((product, i) => (
              <Card key={product._id} item={product} />
            ))}
          </Provider>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
