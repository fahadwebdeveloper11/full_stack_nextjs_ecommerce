import dynamic from "next/dynamic";
const AuthProvider = dynamic(() => import("@/context/AuthProvider"), {
  ssr: false,
});
const Profile = dynamic(() => import("./profile"), {
  ssr: false,
});

const page = () => {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
};

export default page;
