"use client";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Direction from "../components/Direction";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});
import EventCalendar from "../components/EventCalendar";
const MapPage = () => {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Direction />
      <Map />
      <EventCalendar />
      <Footer />
    </div>
  );
};

export default MapPage;
