import dynamic from "next/dynamic";

const AdminOrders = dynamic(() => import("./orders"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <AdminOrders />
    </>
  );
};

export default page;
