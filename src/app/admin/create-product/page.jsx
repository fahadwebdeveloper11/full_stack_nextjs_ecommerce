import dynamic from "next/dynamic";

const CreateProduct = dynamic(() => import("./createProduct"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <CreateProduct />
    </>
  );
};

export default page;
