"use client";
import BottomFooter from "@/components/BottomFooter";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  // Solution 1: Resize handler with iframe scaling

  // Solution 2: Redirect approach (uncomment to use instead)
  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <iframe
        // src="https://redlight-one.vercel.app/"
        src="https://redlight-black.vercel.app/"
        style={{
          border: "none",
          height: "100%",
          width: "100vw",
          position: "absolute",
          left: 0,
          zIndex: 1,
          transform: "scale(1)",
          transformOrigin: "top left",
        }}
        title="Redlight One Map"
        allowFullScreen
        allow="clipboard-write; clipboard-read; fullscreen; geolocation; web-share"
      />
      <BottomFooter />
    </div>
  );
};

export default Page;

// import RedLight from "@/components/RedLight";
// import React from "react";

// const page = () => {
//   return <RedLight />;
// };

// export default page;
