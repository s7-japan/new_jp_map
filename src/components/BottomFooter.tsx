"use client"; // Add this since it's a client component
import React from "react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import "./Footer.css";
import { useStore } from "@/store/menuStore"; // Adjust path based on your structure
import { event } from "@/lib/gtag";

const BottomFooter = () => {
  const { isOpen, toggleMenu, showLoader, hideLoader } = useStore();

  const handleNavigation = () => {
    showLoader(); // Show loader on navigation start
    // Optionally, hide it after a delay or tie it to navigation completion
    setTimeout(() => hideLoader(), 1000); // Example: hide after 1 second
  };

  const handleMenuToggle = () => {
    // Track hamburger menu toggle event
    event({
      action: isOpen ? 'menu_close' : 'menu_open',
      category: 'navigation',
      label: 'hamburger_menu'
    });
    
    toggleMenu(); // Toggle menu state from store
    setTimeout(() => hideLoader(), 500); // Hide loader after menu transition
  };

  const triggerURL = (url: string) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    console.log("working");
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  return (
    <footer className="footer">
      <ul className="footer-btn">
        <li
          onClick={() => {
            // Track footer home button click
            event({
              action: 'link_click',
              category: 'navigation',
              label: 'footer_home'
            });
            
            triggerURL(
              "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appfooterhome"
            );
          }}
          className="footer-btn__item"
        >
          <Link
            href="https://miniapp.line.me/2006998715-gnzj57yj"
            onClick={handleNavigation}
          >
            <img src="/FooterIcons/footer_btn_01.svg" alt="HOME" />
          </Link>
        </li>
        <li
          onClick={() => {
            // Track footer driver button click
            event({
              action: 'link_click',
              category: 'navigation',
              label: 'footer_driver'
            });
            
            triggerURL(
              "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appfooterdriver"
            );
          }}
          className="footer-btn__item"
        >
          <Link
            href="https://miniapp.line.me/2006998715-gnzj57yj/driver"
            onClick={handleNavigation}
          >
            <img src="/FooterIcons/footer_btn_02.svg" alt="DRIVER" />
          </Link>
        </li>
        <li
          onClick={() => {
            // Track footer circuit button click
            event({
              action: 'link_click',
              category: 'navigation',
              label: 'footer_circuit'
            });
            
            triggerURL(
              "https://app.dialogone.jp/v1/linelogin/auth/414a525aca27bd66?index=20250329appfootercircuit"
            );
          }}
          className="footer-btn__item"
        >
          <Link
            href="https://miniapp.line.me/2007078799-0oWyrXee/circuitjourney"
            onClick={handleNavigation}
          >
            <img src="/FooterIcons/footer_btn_03.svg" alt="CIRCUIT" />
          </Link>
        </li>
        <li className="footer-btn__item">
          <button onClick={handleMenuToggle}>
            <img src="/FooterIcons/footer_btn_04.svg" alt="MENU" />
          </button>
        </li>
      </ul>
      <HamburgerMenu isOpen={isOpen} onClose={() => toggleMenu()} />
    </footer>
  );
};

export default BottomFooter;
