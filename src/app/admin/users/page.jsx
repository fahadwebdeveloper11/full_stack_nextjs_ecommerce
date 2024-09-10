import dynamic from "next/dynamic";

const Users = dynamic(() => import("./users"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <Users />
    </>
  );
};

export default page;
