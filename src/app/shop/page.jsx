import dynamic from "next/dynamic";

const Shop = dynamic(() => import("./shop"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <Shop />
    </>
  );
};

export default page;
