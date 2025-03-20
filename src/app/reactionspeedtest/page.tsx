"use client";
import BottomNav from "@/components/BottomNav";
import React from "react";

const Page = () => {
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
        overflow: "hidden", // Prevent scrolling issues
      }}
    >
      <iframe
        src="https://redlight-one.vercel.app/"
        style={{
          border: "none",
          height: "100%", // Keep full height
          width: "100%",
          position: "absolute",
          // top: "-56px", // Shift iframe up by the height of its nav (adjust as needed)
          left: 0,
          zIndex: 1, // Lower z-index than BottomNav
        }}
        title="Redlight One Map"
        allowFullScreen
      />
      <BottomNav />
    </div>
  );
};

export default Page;
