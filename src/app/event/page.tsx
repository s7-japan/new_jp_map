"use client";

import React from "react";
import Event from "@/components/Event";
import BackToMap from "@/components/BackToMap";
import EventMapHeader from "@/components/EventMapHeader";
import BottomNav from "@/components/BottomNav";
const EventPage = () => {
  return (
    <div className="bg-white w-full h-[100dvh] ">
      <div>
        <EventMapHeader />
        <Event />
        <BackToMap />
      </div>
      <BottomNav />
    </div>
  );
};

export default EventPage;
