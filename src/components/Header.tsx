const Header = () => {
  return (
    <div className="h-[65px] rounded-bl-2xl rounded-br-2xl flex flex-col justify-between items-center fixed w-full bg-white z-[1500] formula1 shadow-xl pb-5">
      <strong className="font-normal text-[1.6rem]">
        CI<span className="text-[#E00400]">R</span>CUIT JOU
        <span className="text-[#E00400]">R</span>NEY
      </strong>
      <p className="font-bold text-[12px]  mb-5 HiraginoBold">
        サーキットジャーニー
      </p>
    </div>
  );
};

export default Header;
