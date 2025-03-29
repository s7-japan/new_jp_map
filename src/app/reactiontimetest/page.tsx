"use client";
import BottomFooter from "@/components/BottomFooter";
import React, { useEffect } from "react";

const Page = () => {
  // const triggerURL = (url: string) => {
  //   const iframe = document.createElement("iframe");
  //   iframe.style.display = "none";
  //   iframe.src = url;

  //   document.body.appendChild(iframe);

  //   console.log("working");
  //   setTimeout(() => {
  //     document.body.removeChild(iframe);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   triggerURL(
  //     "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appRTTcircuit"
  //   );
  // }, []);

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
        allow="clipboard-write; clipboard-read; fullscreen; geolocation; web-share"
      />
      <BottomFooter />
    </div>
  );
};

export default Page;
