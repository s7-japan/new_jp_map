'use client';

import { Suspense, useEffect } from 'react';
import Script from 'next/script';
import { GTM_ID, initGTM } from '@/lib/gtm';
import { usePathname, useSearchParams } from 'next/navigation';

// Separate component for tracking with hooks that need suspense
function GTMPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize GTM and track page views
  useEffect(() => {
    initGTM();
    
    if (pathname) {
      const url = pathname + searchParams.toString();
      // Push page view event to dataLayer
      window.dataLayer.push({
        event: 'page_view',
        page: url,
      });
    }
  }, [pathname, searchParams]);
  
  return null;
}

// Main component that doesn't directly use the hooks requiring suspense
export default function GoogleTagManager() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Script section */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      
      {/* Wrap the tracker in Suspense */}
      <Suspense fallback={null}>
        <GTMPageTracker />
      </Suspense>
    </>
  );
} 