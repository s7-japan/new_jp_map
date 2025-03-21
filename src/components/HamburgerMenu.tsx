"use client";

import Image from "next/image";
import { slide as Menu } from "react-burger-menu";
import { useMenuStore } from "../store/menuStore";

const HamburgerMenu = () => {
  const { isOpen, setIsOpen } = useMenuStore();

  // Navigation, terms, and social items
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

  const socialItems = [
    { platform: "insta", link: "https://www.instagram.com/f1japanesegp/" },
    { platform: "fb", link: "https://www.facebook.com/suzukacircuit/" },
    { platform: "x", link: "https://twitter.com/suzuka_event" },
    {
      platform: "youtube",
      link: "https://www.youtube.com/channel/UCbVkZ41otxc8rCAu7_gsO6Q",
    },
    {
      platform: "TikTok",
      link: "https://www.tiktok.com/@suzuka.circuit.park?lang=ja-JP",
    },
  ];

  // Custom styles with all numeric values as strings
  const styles = {
    bmMenuWrap: {
      position: "fixed",
      height: "80%",
      width: "80%",
      transition: "transform 0.3s ease-in-out",
      zIndex: "100000",
      right: "0", // Changed from 0 to "0"
      bottom: "0", // Changed from 0 to "0"
      top: "auto",
    },
    bmMenu: {
      background: "#E00400",
      padding: "1.5rem",
      paddingTop: "2rem",
      paddingBottom: "2rem",
      borderRadius: "1.5rem 0 0 0",
      height: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(4px)",
      top: "0", // Already a string, but ensuring consistency
      left: "0",
      right: "0",
      bottom: "0",
      transition: "opacity 0.3s ease-in-out",
      zIndex: "99999",
    },
    bmItemList: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "0", // Changed from 0 to "0"
      margin: "0", // Changed from 0 to "0"
    },
    bmItem: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "0", // Changed from 0 to "0"
      margin: "0", // Changed from 0 to "0"
    },
  };

  // Handle closing with shorter delay
  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <Menu
      right
      isOpen={isOpen}
      onStateChange={(state) => setIsOpen(state.isOpen)}
      onClose={handleClose}
      customBurgerIcon={false}
      styles={styles}
      disableAutoFocus
      disableOverlayClick={false}
    >
      <div className="flex flex-col h-full text-white">
        {/* Navigation Links */}
        <div className="text-base sm:text-lg flex flex-col gap-8 font-medium tracking-wide mt-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center hover:text-gray-200"
            >
              <div>{item.name}</div>
              <Image
                src="/images/arrowIcon.svg"
                width={20}
                height={14}
                alt="arrow icon"
              />
            </a>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Terms Links */}
        <div className="text-sm sm:text-base flex flex-col gap-4 font-medium tracking-wide mt-8">
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

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Social Media Links */}
        <div className="flex items-center justify-between gap-2 mt-5 mb-2">
          {socialItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 p-1"
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
    </Menu>
  );
};

export default HamburgerMenu;
