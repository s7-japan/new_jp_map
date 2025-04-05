"use client";
import React, { useEffect, Suspense } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
import EventCalendar from "@/components/EventCalendar";
import { useRouter, useSearchParams } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BottomFooter from "@/components/BottomFooter";

// Create a separate component that uses useSearchParams
const RedirectHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectPath = searchParams.get("liff.state");

  useEffect(() => {
    if (redirectPath) {
      if (redirectPath.includes("reactiontimetest")) {
        window.location.href = "https://redlight-black.vercel.app/"
      } else {
        router.push(`${redirectPath}`);
      }
    }
  }, [redirectPath]);

  return null;
};

const MapPage = () => {
  useEffect(() => { });
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Map />
      <EventCalendar />
      <Suspense fallback={null}>
        <RedirectHandler />
      </Suspense>
      <BottomFooter />
    </div>
  );
};

export default MapPage;
