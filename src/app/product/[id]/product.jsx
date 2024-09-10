"use client";

import Card from "@/components/common/Card/Card";
import SkeletonCard from "@/components/common/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import useSWR from "swr";

import StoreProvider from "@/app/StoreProvider";
import ProductDetails from "./ProductDetails";
import ProductReviewForm from "./ProductReviewForm";
import { SessionProvider } from "next-auth/react";
import { Rating } from "@mui/material";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Product({ params }) {
 
  const { data, isLoading, error } = useSWR(
    `/api/product/get-details/${params?.id}`,
    fetcher
  );

  // console.log(error);
  // console.log(data);

  const { data: relatedProdcuts, isLoading: relatedProductsLoading } = useSWR(
    `/api/product/trending-products`,
    fetcher
  );

  const products = relatedProdcuts?.products?.filter(
    (product) => product._id !== data?.product?._id
  );

  // console.log(relatedProdcuts);

  
  if (error?.response?.data?.success === false)
    return (
      <div className="bg-gray-100 dark:bg-gray-800 py-8 text-center flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </div>
    );

  return (
    <SessionProvider>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={data?.product?.image?.url}
                    alt="Product Image"
                  />
                )}
              </div>
            </div>
            {isLoading ? (
              <div className="md:flex-1 px-4 ">
                <Skeleton className="w-[90%] sm:w-[50%] h-14 mb-2" />
                <div className="flex items-center gap-5 mb-4">
                  <Skeleton className="w-[30%] h-6" />
                  <Skeleton className="w-[30%] h-6" />
                </div>
                <Skeleton className="w-[50%] h-8 mb-4" />
                <div className="mb-4">
                  <Skeleton className="w-[20%] h-5 mb-2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-6 h-6 rounded-full" />
                  </div>
                </div>
                <div className="mb-4">
                  <Skeleton className="w-[30%] h-10 rounded-full" />
                </div>

                <Skeleton className="w-[80%] h-32" />
              </div>
            ) : (
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {data?.product?.title}
                </h2>

                <div className="flex mb-4 flex-wrap gap-2">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      Rs {data?.product?.price}
                      <strike className="text-red-600 font-light text-sm ml-1">
                        {" "}
                        Rs {data?.product?.discountedPrice}
                      </strike>
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {data?.product?.quantity > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Rating:
                  </span>
                  <Rating
                    name="read-only"
                    value={data?.product?.rating}
                    readOnly
                  />
                  ({data?.product?.rating.toFixed(1)})
                </div>
                <StoreProvider>
                  <ProductDetails product={data?.product} />
                </StoreProvider>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Product Description:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {data?.product?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <ProductReviewForm productId={data?.product?._id} />
        </div>

        <div className="px-2 sm:px-8 py-10 md:py-16">
          <h1 className="text-2xl sm:text-4xl text-center mb-5 font-bold text-gray-800 dark:text-white">
            You may also like
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <StoreProvider>
              {relatedProductsLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : products?.map((product) => (
                    <Card key={product._id} item={product} />
                  ))}
            </StoreProvider>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

export default Product;
