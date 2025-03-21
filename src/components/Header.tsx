const Header = () => {
  return (
    <div className="h-[90px] rounded-bl-4xl rounded-br-4xl shadow-lg flex flex-col justify-center items-center fixed w-full bg-white z-[50]">
      <h1 className="h-[20px] text-lg gap-2 MyCustomFont">
        <strong className="text-[#DD1C1C] ">E</strong>VENT M
        <strong className="text-[#DD1C1C] ">A</strong>P
      </h1>
      <p className="text-sm mt-2 MyCustomFont">イベントマップ</p>
    </div>
  );
};

export default Header;
