/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

const EventMapHeader = ({ scrollRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    if (!scrollRef?.current) return;

    const handleScroll = () => {
      const currentScrollPos = scrollRef.current.scrollTop;

      // Debugging
      console.log(
        "ScrollTop:",
        currentScrollPos,
        "Prev:",
        prevScrollPos,
        "Visible:",
        isVisible
      );

      const shouldShow = currentScrollPos < 15; // Show only when less than 10px from top
      const shouldHide = currentScrollPos > prevScrollPos; // Hide as soon as you scroll down even a little

      if (shouldShow && !isVisible) setIsVisible(true);
      else if (shouldHide && isVisible) setIsVisible(false);

      setPrevScrollPos(currentScrollPos);
    };

    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isVisible, scrollRef]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full bg-white rounded-b-3xl text-center shadow-xl z-[1000] transition-all duration-500 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
        style={{ height: "65px" }}
      >
        <div className="flex flex-col justify-between items-center h-full formula1">
          <strong className="font-normal text-[1.6rem] formula1">
            <span className="text-[#E00400]">E</span>VENT CAL
            <span className="text-[#E00400]">E</span>NDAR
          </strong>
          <p className="text-[12px] HiraginoBold mb-5 ">イベントカレンダー</p>
        </div>
      </div>
      <div style={{ height: "65px" }} className="w-full" />
    </>
  );
};

export default EventMapHeader;
