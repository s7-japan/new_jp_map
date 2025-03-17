import { DirectionIcon } from "../icons/footer";
const Direction = () => {
  return (
    <div className="fixed top-[86px] flex  h-[50px] w-[100dvw] items-center  z-[50]">
      <div className="flex items-center justify-center gap-2 mx-auto  shadow-2xl w-[60dvw] py-2 rounded-bl-2xl rounded-br-2xl bg-white">
        <DirectionIcon />
        <h1>アクアパーク周辺</h1>
      </div>
    </div>
  );
};

export default Direction;
