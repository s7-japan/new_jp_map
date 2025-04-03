"use client";
import BottomFooter from "@/components/BottomFooter";
import React from "react";

const Page = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <iframe
        src="https://redlight-one.vercel.app/"
        style={{
          border: "none",
          height: "100%",
          width: "100%",
          margin: 0,
          padding: 0,
          position: "absolute",
          left: 0,
          zIndex: 1,
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
