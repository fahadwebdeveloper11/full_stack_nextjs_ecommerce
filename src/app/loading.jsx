import dynamic from "next/dynamic";

const Loading = dynamic(() => import("./loader"), {
  ssr: false,
});

const loading = () => {
  return (
    <>
      <Loading />
    </>
  );
};

export default loading;
