import dynamic from "next/dynamic";

const Cart = dynamic(() => import("./Cart"), {
  ssr: false,
});

const StoreProvider = dynamic(() => import("@/app/StoreProvider"), {
  ssr: false,
});

const AuthProvider = dynamic(() => import("@/context/AuthProvider"), {
  ssr: false,
});

const page = () => {
  return (
    <StoreProvider>
      <AuthProvider>
        <Cart />
      </AuthProvider>
    </StoreProvider>
  );
};

export default page;
