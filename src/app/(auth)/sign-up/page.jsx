import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("./signUp"), {
  ssr: false,
});

const page = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default page;
