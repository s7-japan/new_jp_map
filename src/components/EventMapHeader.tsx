const EventMapHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white rounded-b-3xl text-center shadow-xl z-[1000] flex flex-col justify-center items-center h-[80px] font-[MyCustomFont] py-8">
      <h1 className="text-black text-lg m-0 tracking-wider font-normal font-[MyCustomFont] md:text-base">
        <span className="text-red-500">E</span>VENT CAL
        <span className="text-red-500">E</span>NDAR
      </h1>
      <h2 className="text-black text-sm mt-1 font-normal font-[JPFont]">
        リアクションタイムテスト
      </h2>
    </div>
  );
};

export default EventMapHeader;
