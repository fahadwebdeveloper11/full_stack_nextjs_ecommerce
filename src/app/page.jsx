import FeaturedProducts from "@/components/Featured Products/FeaturedProducts";
import Hero from "@/components/Hero/Hero";
import OurServices from "@/components/Our Services/OurServices";
import TrendingProduct from "@/components/Trending Products/TrendingProduct";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingProduct />
      <FeaturedProducts />
      <OurServices/>
    </>
  );
}
