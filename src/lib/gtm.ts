// Google Tag Manager ID (you'll need to replace this with your actual GTM ID)
export const GTM_ID = 'GTM-N78SJZ72';

// Initialize GTM dataLayer
export const initGTM = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
};

// Push event to GTM dataLayer
export const pushEvent = (event: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
} 