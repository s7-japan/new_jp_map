"use client"; // Add this since it’s a client component
import { useRouter } from "next/navigation";
import { useStore } from "@/store/menuStore"; // Adjust path to your store

const EventCalendar = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useStore();

  const handleNavigation = () => {
    showLoader(); // Show loader when button is clicked
    router.push("/calendar"); // Navigate to /calendar
    // Optionally hide loader after a delay (simulating navigation completion)
    setTimeout(() => hideLoader(), 1000); // Adjust delay as needed
  };

  return (
    <div className="fixed bottom-[100px] text-[18px] text-center w-[100dvw]">
      <div>
        <button
          className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto MyCustomFont"
          onClick={handleNavigation}
        >
          <strong className="text-[#DD1C1C] font-normal">E</strong>VENT{" "}
          <strong className="text-[#DD1C1C] font-normal">C</strong>ALENDAR
        </button>
      </div>
    </div>
  );
};

export default EventCalendar;
