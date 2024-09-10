import dynamic from "next/dynamic";

const Verify = dynamic(() => import("./verify"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <Verify />
    </>
  );
};

export default page;
