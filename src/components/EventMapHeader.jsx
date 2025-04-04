/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";

const EventMapHeader = ({ scrollRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Debounce function to smooth out scroll events
  const debounce = useCallback((fn, ms) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), ms);
    };
  }, []);

  useEffect(() => {
    if (!scrollRef?.current) return;

    const handleScroll = () => {
      // Prevent negative scroll values from iOS bounce
      const currentScrollPos = Math.max(0, scrollRef.current.scrollTop);

      // More nuanced show/hide logic
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const shouldShow = currentScrollPos < 15;
      // Only hide when scrolling down past a threshold
      const shouldHide = isScrollingDown && currentScrollPos > 50 && isVisible;

      if (shouldShow && !isVisible) {
        setIsVisible(true);
      } else if (shouldHide) {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    // Debounce scroll handler for better performance
    const debouncedHandleScroll = debounce(handleScroll, 50);
    const scrollElement = scrollRef.current;

    // Use passive listener for better scroll performance
    scrollElement.addEventListener("scroll", debouncedHandleScroll, {
      passive: true,
    });

    // Cleanup
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, [prevScrollPos, isVisible, scrollRef, debounce]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full bg-white rounded-b-3xl text-center shadow-xl z-[1000] transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{
          height: "65px",
          WebkitOverflowScrolling: "touch", // Better iOS scroll feel
          transform: "translate3d(0,0,0)", // Hardware acceleration
          willChange: "transform, opacity", // Performance hint
        }}
      >
        <div className="flex flex-col justify-between items-center h-full formula1">
          <strong className="font-normal text-[1.6rem] formula1">
            <span className="text-[#E00400]">E</span>VENT CAL
            <span className="text-[#E00400]">E</span>NDAR
          </strong>
          <p className="text-[12px] HiraginoBold mb-5">イベントカレンダー</p>
        </div>
      </div>
      <div style={{ height: "65px" }} className="w-full" />
    </>
  );
};

export default EventMapHeader;
