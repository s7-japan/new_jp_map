"use client"; // Add this since it’s a client component
import { useRouter } from "next/navigation";
import { useStore } from "@/store/menuStore"; // Adjust path to your store

const BackToMap = () => {
  const navigate = useRouter();
  const { showLoader, hideLoader } = useStore();

  const handleNavigation = () => {
    showLoader(); // Show loader when button is clicked
    navigate.push("/"); // Navigate to root (/)
    // Optionally hide loader after a delay (simulating navigation completion)
    setTimeout(() => hideLoader(), 1000); // Adjust delay as needed
  };

  return (
    <div className="fixed bottom-[80px] text-[18px] text-center w-[100dvw] z-[100] MyCustomFont">
      <div className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto">
        <button onClick={handleNavigation}>
          <strong className="font-normal">
            CI<span className="text-[#ff0000]">R</span>CUIT JOURN
            <span className="text-[#ff0000]">E</span>Y
          </strong>
        </button>
      </div>
    </div>
  );
};

export default BackToMap;
