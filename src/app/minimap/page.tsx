"use client";
import React from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
import EventCalendar from "@/components/EventCalendar";
import BottomFooter from "@/components/BottomFooter";

const MapPage = () => {
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
