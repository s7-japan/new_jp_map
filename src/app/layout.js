"use client";

import { useRef } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }) {
  const menuButtonRef = useRef(null); // Ref initialized as null, no type needed in JS

  return (
    <html lang="en">
      <body className="h-[100dvh] w-[100dvw] overflow-hidden">
        <HamburgerMenu menuButtonRef={menuButtonRef} />
        {children}
        <BottomNav ref={menuButtonRef} />
      </body>
    </html>
  );
}
