"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";
import Loader from "@/components/Loader";
import Script from "next/script";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { pageview, GA_MEASUREMENT_ID } from '@/lib/gtag';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* DialogOne Inline Configuration */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              DialogOne = {
                'COOKIE_DOMAIN' : '.f1.weseegpt.com'
              };
            `,
          }}
        />
        {/* DialogOne External Script */}
        <Script
          src="https://d2ibu2ug0mt5qp.cloudfront.net/js/loader-d4dedd1ee5d8f18c6304b1bf0a9ee57a6a56ec00.min.js"
          strategy="afterInteractive"
        />
        <title>F1日本GP Map/Game</title>
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
