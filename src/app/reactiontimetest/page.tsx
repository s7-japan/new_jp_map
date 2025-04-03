"use client";
import BottomFooter from "@/components/BottomFooter";
import React, { useEffect } from "react";

const Page = () => {
  const handleModalClose = () => {
    document.body.focus(); // Restore focus to body
    window.scrollTo(0, 0); // Reset scroll position
  };

  useEffect(() => {
    // Simulate modal close event (replace with actual event from your modal)
    window.addEventListener("modalClosed", handleModalClose);
    return () => window.removeEventListener("modalClosed", handleModalClose);
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
        // Remove or adjust overflow if needed
        // overflow: "hidden",
      }}
    >
      <iframe
        src="https://redlight-one.vercel.app/"
        style={{
          border: "none",
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          zIndex: 1,
        }}
        title="Redlight One Map"
        allowFullScreen
        allow="clipboard-write; clipboard-read; fullscreen; geolocation; web-share"
        tabIndex={-1} // Prevent iframe from being focusable
      />
      <BottomFooter />
    </div>
  );
};

export default Page;
