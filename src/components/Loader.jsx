import React from "react";
import { useStore } from "../store/menuStore"; // Correct import from your store file

const Loader = () => {
  const { isLoading } = useStore();

  return (
    <div
      className={`${
        isLoading ? "block" : "hidden"
      } h-screen w-full fixed top-0 left-0 bg-white flex justify-center items-center`}
      style={{ zIndex: 2000000 }}
    >
      <img
        src="/assets/loading_white.gif"
        alt="Loading..."
        className="w-full object-contain" // Optional: Limit width for better UX
      />
    </div>
  );
};

export default Loader;
