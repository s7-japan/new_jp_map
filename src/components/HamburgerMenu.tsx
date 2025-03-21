"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMenuStore } from "../store/menuStore";

const HamburgerMenu = () => {
  const { isOpen, setIsOpen } = useMenuStore();
  const menuRef = useRef<HTMLDivElement>(null);
  // Add state to control animation
  const [animationComplete, setAnimationComplete] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  // Set animation state when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      setAnimationComplete(false);
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 400); // Match this with your transition duration
      document.body.style.overflow = ""; // Re-enable scrolling
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Navigation items with links
  const navItems = [
    {
      name: "チケット",
      link: "https://www.suzukacircuit.jp/f1/ticket/index.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_ticket&utm_campaign=f1&utm_content=20250331",
    },
    {
      name: "アクセス",
      link: "https://www.suzukacircuit.jp/f1/access/index.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_access&utm_campaign=f1&utm_content=20250331",
    },
    {
      name: "オンラインショップ",
      link: "https://goods.mobilitystation.jp/",
    },
    {
      name: "会員限定",
      link: "https://ticket.mobilitystation.jp/",
    },
    {
      name: "オンライン観戦",
      link: "https://www.suzukacircuit.jp/f1/dazn.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_dazn&utm_campaign=f1&utm_content=20250331",
    },
    {
      name: "お問い合わせ",
      link: "https://www.suzukacircuit.jp/contact_s/?utm_medium=lineeoa&utm_source=ln_miniapp_menu_contact&utm_campaign=f1&utm_content=20250331",
    },
  ];

  // Terms items with links
  const termsItems = [
    {
      name: "利用規約",
      link: "https://www.honda-ml.co.jp/legal/line/terms.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_terms&utm_campaign=f1&utm_content=20250331",
    },
    {
      name: "プライバシーポリシー",
      link: "https://www.honda-ml.co.jp/privacy/?utm_medium=lineeoa&utm_source=ln_miniapp_menu_privacy&utm_campaign=f1&utm_content=20250331",
    },
    {
      name: "クレジットライセンス",
      link: "https://www.honda-ml.co.jp/legal/line/credit.html?utm_medium=lineeoa&utm_source=ln_miniapp_menu_credit&utm_campaign=f1&utm_content=20250331",
    },
  ];

  // Social media items with links
  const socialItems = [
    {
      platform: "insta",
      link: "https://www.instagram.com/f1japanesegp/",
    },
    {
      platform: "fb",
      link: "https://www.facebook.com/suzukacircuit/",
    },
    {
      platform: "x",
      link: "https://twitter.com/suzuka_event",
    },
    {
      platform: "youtube",
      link: "https://www.youtube.com/channel/UCbVkZ41otxc8rCAu7_gsO6Q",
    },
    {
      platform: "TikTok",
      link: "https://www.tiktok.com/@suzuka.circuit.park?lang=ja-JP",
    },
  ];

  return (
    <>
      {(!animationComplete || isOpen) && (
        <>
          {/* Backdrop with fade animation */}
          <div
            className={`fixed inset-0 z-[99999] transition-opacity duration-400 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0"
            } bg-black/30 backdrop-blur-sm`}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu with consistent slide animation for both opening and closing */}
          <div
            ref={menuRef}
            className="fixed top-20 right-0 bottom-10 w-[80%] z-[100000] h-screen transition-all duration-400 ease-in-out transform"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 400ms ease-in-out",
            }}
          >
            <div className="bg-[#E00400] rounded-tl-3xl rounded-bl-3xl h-[80%] text-white px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 flex flex-col justify-between gap-8 sm:gap-10 md:gap-14 overflow-y-auto">
              {/* Navigation Links with consistent staggered animation */}
              <div className="text-base sm:text-lg md:text-xl flex flex-col gap-4 sm:gap-6 md:gap-7 font-medium tracking-widest">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center hover:text-gray-200"
                    style={{
                      transform: isOpen ? "translateX(0)" : "translateX(40px)",
                      opacity: isOpen ? 1 : 0,
                      transition: `transform 400ms ease-in-out, opacity 400ms ease-in-out`,
                      transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <div>{item.name}</div>
                    <Image
                      src="/images/arrowIcon.svg"
                      width={24}
                      height={16}
                      alt="arrow icon"
                    />
                  </a>
                ))}
              </div>

              {/* Terms Links */}
              <div className="text-sm sm:text-base md:text-lg flex flex-col gap-1 sm:gap-2 font-medium tracking-widest">
                {termsItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-5">
                {socialItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    <Image
                      src={`/images/${item.platform}.svg`}
                      alt={item.platform}
                      width={20}
                      height={20}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
