import { useRouter } from "next/navigation";
const BackToMap = () => {
  const navigate = useRouter();
  return (
    <div className="fixed bottom-[80px] text-[18px]  text-center  w-[100dvw] z-[100] MyCustomFont">
      <div className="bg-white py-2 w-[80dvw] rounded-full shadow-2xl mx-auto">
        <button onClick={() => navigate.push("/")}>
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
