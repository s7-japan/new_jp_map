"use client"
import React, { useEffect, Suspense } from "react"
import Header from "@/components/Header"
import Direction from "@/components/Direction"
import dynamic from "next/dynamic"
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
})
import EventCalendar from "@/components/EventCalendar"

const RedirectHandler = () => {
  useEffect(() => {
    alert(window.location.href)
  }, [])

  return null
}

const MapPage = () => {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Direction />
      <Map />
      <EventCalendar />
      <Suspense fallback={null}>
        <RedirectHandler />
      </Suspense>
    </div>
  );
};

export default MapPage;
