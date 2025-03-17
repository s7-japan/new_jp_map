"use client";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Direction from "../components/Direction";
import Map from "../components/Map";
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
