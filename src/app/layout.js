"use client";

import ErrorBoundary from "@/components/ErrorBoundary"; // Import your existing ErrorBoundary
import "./globals.css";

import Loader from "@/components/Loader";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-[100dvh] w-[100dvw] overflow-hidden">
        <ErrorBoundary>
          <Loader />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
