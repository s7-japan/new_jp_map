const Header = () => {
  return (
    <div className="h-[90px] rounded-bl-4xl rounded-br-4xl shadow-lg flex flex-col justify-center items-center fixed w-full bg-white z-[50] MyCustomFont">
      <strong className="font-normal text-[1.1rem]">
        CI<span className="text-[#ff0000]">R</span>CUIT JOURN
        <span className="text-[#ff0000]">E</span>Y
      </strong>
      <p className="text-sm mt-1 MyCustomFont">サーキットジャーニー</p>
    </div>
  );
};

export default Header;
