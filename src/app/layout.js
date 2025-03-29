"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";
import Loader from "@/components/Loader";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DialogOne Inline Configuration */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              DialogOne = {
                'COOKIE_DOMAIN' : '.weseegpt.com'
              };
            `,
          }}
        />
        {/* DialogOne External Script */}
        <Script
          src="https://d2ibu2ug0mt5qp.cloudfront.net/js/loader-d4dedd1ee5d8f18c6304b1bf0a9ee57a6a56ec00.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="h-[100dvh] w-[100dvw] overflow-hidden">
        <ErrorBoundary>
          <Loader />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
