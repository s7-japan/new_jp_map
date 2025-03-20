"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Direction from "@/components/Direction";
import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
import EventCalendar from "@/components/EventCalendar";

import { useSearchParams, useRouter } from "next/navigation";

const MapPage = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectPath = searchParams.get("redirect");

  useEffect(() => {
    if (redirectPath)
      router.push(`/${redirectPath}`)
  }, [redirectPath, router])

  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Direction />
      <Map />
      <EventCalendar />
      <BottomNav />
    </div>
  );
};

export default MapPage;
