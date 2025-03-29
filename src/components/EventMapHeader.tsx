/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

const EventMapHeader = () => {
  const [_visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="fixed h-[65px] top-0 left-0 right-0 bg-white rounded-b-3xl text-center shadow-xl z-[1000] flex-col justify-between items-center  MyCustomFont pb-3">
      <strong className="font-normal text-[1.6rem]">
        <span className="text-[#ff0000]">E</span>VENT CAL
        <span className="text-[#ff0000]">E</span>NDAR
      </strong>
      <p className="font-bold text-[12px] font-[JPFonts] mb-5">
        イベントカレンダー
      </p>
    </div>
  );
};

export default EventMapHeader;
