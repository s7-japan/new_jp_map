"use client";
import React from "react";

const Page = () => {
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
    </div>
  );
};

export default Page;
