const EventMapHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white rounded-b-3xl text-center shadow-xl z-[1000] flex-col justify-center items-center  font-[MyCustomFont] py-3">
      <strong className="font-normal text-[1.6rem]">
        <span className="text-[#ff0000]">E</span>VENT CAL
        <span className="text-[#ff0000]">E</span>NDAR
      </strong>
      <p className="font-light text-[12px] font-[JPFonts] mb-5">
        サーキットジャーニー
      </p>
    </div>
  );
};

export default EventMapHeader;
