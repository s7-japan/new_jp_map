import { useEffect } from "react";
import Image from "next/image";

const EventMapHeader = () => {
  useEffect(() => {
    const headerFlag = false;
    const header = document.querySelector('[data-js="header"]');
    const range = 35;
    let save = 0;

    if (!header) return;

    const handleScroll = () => {
      if (!headerFlag) {
        const now = window.scrollY;
        if (now > save + range) {
          header.classList.add("is-hide");
          save = now;
        } else if (now < save - range || now === 0) {
          header.classList.remove("is-hide");
          save = now;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []); // Runs only once when the component mounts

  return (
    <header className="header" data-js="header">
      <div className="header-hdg">
        <h1 className="header-hdg__img">
          <Image
            src="/assets/logo_site_01.svg"
            alt="FORMULA 1 JAPANESE GRAND PRIX 2025"
            width={400}
            height={400}
          />
        </h1>
      </div>
    </header>
  );
};

export default EventMapHeader;
