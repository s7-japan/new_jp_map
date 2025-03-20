"use client";
import React, { useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Direction from "@/components/Direction";
import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
import EventCalendar from "@/components/EventCalendar";
import { useRouter, useSearchParams } from "next/navigation";

// Create a separate component that uses useSearchParams
const RedirectHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectPath = searchParams.get("redirect");

  useEffect(() => {
    if (redirectPath)
      router.push(`/${redirectPath}`)
  }, [redirectPath, router]);

  return null;
};

const MapPage = () => {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Direction />
      <Map />
      <EventCalendar />
      <BottomNav />
      <Suspense fallback={null}>
        <RedirectHandler />
      </Suspense>
    </div>
  );
};

export default MapPage;