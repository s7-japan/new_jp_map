import Header from "@/components/Header";
import Direction from "@/components/Direction";
import Map from "@/components/Map";
import EventCalendar from "@/components/EventCalendar";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    window.location.href = "https://redlight-black.vercel.app/"
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <Direction />
      <Map />
      <EventCalendar />
    </div>
  );
}
