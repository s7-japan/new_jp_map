import { useRouter } from "next/navigation";
const EventCalendar = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-[100px] text-[20px]  text-center  w-[100dvw]">
      <div className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto ">
        <button
          className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto"
          onClick={() => router.push("/calender")}
        >
          <strong className="text-[#DD1C1C] font-normal">E</strong>VENT{" "}
          <strong className="text-[#DD1C1C] font-normal">C</strong>ALENDAR
        </button>
      </div>
    </div>
  );
};

export default EventCalendar;
