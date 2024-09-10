import dynamic from "next/dynamic";

const Product = dynamic(() => import("./product"), {
  ssr: false,
});

const page = ({ params }) => {
  return (
    <>
      <Product params={params}/>
    </>
  );
};

export default page;
