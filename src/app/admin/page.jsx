import dynamic from "next/dynamic";

const AdminHome = dynamic(() => import("./dashboard"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <AdminHome />
    </>
  );
};

export default page;
