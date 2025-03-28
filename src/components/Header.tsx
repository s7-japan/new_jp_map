const Header = () => {
  return (
    <div className="h-[65px] rounded-bl-2xl rounded-br-2xl flex flex-col justify-between items-center fixed w-full bg-white z-[50] MyCustomFont shadow-md shadow-black/50">
      <strong className="font-normal text-[1.6rem]">
        CI<span className="text-[#ff0000]">R</span>CUIT JOURN
        <span className="text-[#ff0000]">E</span>Y
      </strong>
      <p className="font-bold text-[12px]  mb-5 font-[JPFonts]">
        サーキットジャーニー
      </p>
    </div>
  );
};

export default Header;
