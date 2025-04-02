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

// Create a separate component that handles redirection
const RedirectHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectPath = searchParams.get("liff.state");
  const hasRedirected = React.useRef(false); // Track if redirection has occurred

  useEffect(() => {
    if (redirectPath && !hasRedirected.current) {
      hasRedirected.current = true; // Mark as redirected to prevent further execution

      if (redirectPath.includes("reactiontimetest")) {
        window.location.href = "https://redlight-one.vercel.app/";
      } else {
        router.push(`${redirectPath}`);
      }
    }
  }, [redirectPath, router]);

  return null; // No UI is rendered for this component
};

const MapPage = () => {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <Map />
      <EventCalendar />
      <Suspense fallback={<div>Loading...</div>}>
        <RedirectHandler />
      </Suspense>
      <BottomFooter />
    </div>
  );
};

export default MapPage;
