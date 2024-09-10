import dynamic from "next/dynamic";

const Product = dynamic(() => import("./product"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <Product />
    </>
  );
};

export default page;
