"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
import EventCalendar from "@/components/EventCalendar";
import BottomFooter from "@/components/BottomFooter";

const MapPage = () => {
  const triggerURL = (url:string) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    console.log("working");
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  useEffect(()=>{
    triggerURL("https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appcalendarcircuit");
  },[])

  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Map />
      <EventCalendar />
      <BottomFooter />
    </div>
  );
};

export default MapPage;
