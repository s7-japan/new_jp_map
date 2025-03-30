"use client";

import React, { useRef } from "react";
import Event from "@/components/Event";
import BackToMap from "@/components/BackToMap";
import EventMapHeader from "@/components/EventMapHeader";
import BottomFooter from "@/components/BottomFooter";

const EventPage = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div
      ref={scrollContainerRef}
      className="bg-white w-full overflow-y-auto h-[100dvh]"
    >
      <div>
        <EventMapHeader scrollRef={scrollContainerRef} />
        <Event />
        <BackToMap />
        <BottomFooter />
      </div>
    </div>
  );
};

export default EventPage;
