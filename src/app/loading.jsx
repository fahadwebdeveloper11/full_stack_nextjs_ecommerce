"use client";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    // <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    //   <div className="w-20 h-20 border-8 border-accent-2-base border-b-transparent rounded-full animate-spin"></div>
    // </div>
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
      className="dark:bg-gray-800 bg-[rgba(255, 255, 255, 0.9)]"
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Loading;
