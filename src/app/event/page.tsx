"use client";

import React from "react";
import Event from "@/components/Event";
import BackToMap from "@/components/BackToMap";
import Footer from "@/components/Footer";
import EventMapHeader from "@/components/EventMapHeader";
const EventPage = () => {
  return (
    <div className="bg-white w-full h-[100dvh] ">
      <div>
        <EventMapHeader />
        <Event />
        <BackToMap />
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
