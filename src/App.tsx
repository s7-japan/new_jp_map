import Header from "@/components/Header";
import Direction from "@/components/Direction";
import Map from "@/components/Map";
import EventCalendar from "@/components/EventCalendar";

export default function Home() {

  return (
    <div className="bg-white">
      <Header />
      <Direction />
      <Map />
      <EventCalendar />
    </div>
  );
}
