import { useRouter } from "next/navigation";
const EventCalendar = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-[100px] text-[18px]  text-center  w-[100dvw]">
      <div>
        <button
          className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto MyCustomFont"
          onClick={() => router.push("/eventcalender")}
        >
          <strong className="text-[#DD1C1C] font-normal">E</strong>VENT{" "}
          <strong className="text-[#DD1C1C] font-normal">C</strong>ALENDAR
        </button>
      </div>
    </div>
  );
};

export default EventCalendar;
