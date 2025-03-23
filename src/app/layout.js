"use client";

import { useRef } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNav from "@/components/BottomNav";
import ErrorBoundary from "@/components/ErrorBoundary"; // Import your existing ErrorBoundary
import "./globals.css";

export default function RootLayout({ children }) {
  const menuButtonRef = useRef(null);

  return (
    <html lang="en">
      <body className="h-[100dvh] w-[100dvw] overflow-hidden">
        <ErrorBoundary>
          <HamburgerMenu menuButtonRef={menuButtonRef} />
          {children}
          <BottomNav ref={menuButtonRef} />
        </ErrorBoundary>
      </body>
    </html>
  );
}
