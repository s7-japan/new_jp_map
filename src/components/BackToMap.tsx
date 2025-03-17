import { useRouter } from "next/navigation";
const BackToMap = () => {
  const navigate = useRouter();
  return (
    <div className="fixed bottom-[80px] text-[20px]  text-center  w-[100dvw] z-[100]">
      <button
        className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto"
        onClick={() => navigate.push("/")}
      >
        マップに戻る
      </button>
    </div>
  );
};

export default BackToMap;
