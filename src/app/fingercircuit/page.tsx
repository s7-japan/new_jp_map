"use client";
import BottomFooter from "@/components/BottomFooter";
import React, { useEffect } from "react";

const Page = () => {

  
  const triggerURL = (url: string) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    console.log("working");
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  useEffect(() => {
    triggerURL(
      "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appFCcircuit"
    );
  }, []);


  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      <iframe
        src="https://finger-circuit-game.vercel.app/"
        style={{ border: "none", height: "100%", width: "100%" }}
        title="Finger Circuit Game"
        allowFullScreen
        allow="clipboard-write; clipboard-read; fullscreen; geolocation; web-share"
      />
      <BottomFooter />
    </div>
  );
};

export default Page;
