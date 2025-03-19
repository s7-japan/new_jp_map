"use client";
import BottomNav from "@/components/BottomNav";
import React from "react";

const Page = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <iframe
        src="https://redlight-one.vercel.app/"
        style={{ border: "none", height: "100%", width: "100%" }}
        title="Redlight One Map"
        allowFullScreen
      />
      <BottomNav />
    </div>
  );
};

export default Page;
