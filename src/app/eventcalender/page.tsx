"use client";

import React from "react";
import Event from "@/components/Event";
import BackToMap from "@/components/BackToMap";
import EventMapHeader from "@/components/EventMapHeader";
import BottomFooter from "@/components/BottomFooter";
const EventPage = () => {
  return (
    <div className="bg-white w-full h-[100dvh] overflow-y-auto">
      <div>
        <EventMapHeader />
        <Event />
        <BackToMap />
        <BottomFooter />
      </div>
    </div>
  );
};

export default EventPage;
