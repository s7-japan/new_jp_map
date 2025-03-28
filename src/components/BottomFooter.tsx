"use client"; // Add this since it’s a client component
import React from "react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import "./Footer.css";
import { useStore } from "@/store/menuStore"; // Adjust path based on your structure

const BottomFooter = () => {
  const { isOpen, toggleMenu, showLoader, hideLoader } = useStore();

  const handleNavigation = () => {
    showLoader(); // Show loader on navigation start
    // Optionally, hide it after a delay or tie it to navigation completion
    setTimeout(() => hideLoader(), 1000); // Example: hide after 1 second
  };

  const handleMenuToggle = () => {
    toggleMenu(); // Toggle menu state from store
    setTimeout(() => hideLoader(), 500); // Hide loader after menu transition
  };

  return (
    <footer className="footer">
      <ul className="footer-btn">
        <li className="footer-btn__item">
          <Link href="/" onClick={handleNavigation}>
            <img src="/FooterIcons/footer_btn_01.svg" alt="HOME" />
          </Link>
        </li>
        <li className="footer-btn__item">
          <Link href="/reactiontimetest" onClick={handleNavigation}>
            <img src="/FooterIcons/footer_btn_02.svg" alt="DRIVER" />
          </Link>
        </li>
        <li className="footer-btn__item">
          <Link href="/fingercircuit" onClick={handleNavigation}>
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
