"use client";
import React, { useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Direction from "@/components/Direction";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
import EventCalendar from "@/components/EventCalendar";
import { useRouter, useSearchParams } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Create a separate component that uses useSearchParams
const RedirectHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectPath = searchParams.get("liff.state");

  useEffect(() => {
    if (redirectPath) {
      // console.log(redirectPath)
      router.push(`${redirectPath}`);
    }
  }, [redirectPath]);

  return null;
};

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
