'use client';

import Script from 'next/script';
import { LINE_TAG_ID } from '@/lib/line-tag';

export default function LineTagManager() {
  if (!LINE_TAG_ID) {
    return null;
  }

  // The LINE tag script exactly as provided by LINE Mini App documentation
  // No line breaks or extra spaces to prevent issues as per documentation
  const lineTagScript = `(function(g,d,o){g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};var h=d.getElementsByTagName('head')[0];var s=d.createElement('script');s.async=1;s.src=o;h.appendChild(s);})(window,document,'https://tagcalls.line.me/${LINE_TAG_ID}');`.replace('${LINE_TAG_ID}', LINE_TAG_ID);

  return (
    <Script
      id="line-tag"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: lineTagScript
      }}
    />
  );
} 