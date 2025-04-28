// LINE Tag ID (you'll need to replace this with your actual LINE Tag ID)
export const LINE_TAG_ID = '4f6eeb23-33de-4c3b-baa2-294360dc210d';

// Additional configuration options for LINE Tag if needed
export const LINE_TAG_CONFIG = {
  // Add any specific configuration here
};

/**
 * Track a LINE tag event
 * @param eventName The name of the event to track
 * @param params Additional parameters for the event
 */
export const trackLineEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any)._lt) {
    (window as any)._lt('send', eventName, params || {});
  }
};

/**
 * Track a page view with LINE tag
 * @param url The URL to track
 */
export const trackLinePageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any)._lt) {
    (window as any)._lt('send', 'pv', { page: url });
  }
};

/**
 * Track a conversion with LINE tag
 * @param conversionId The conversion ID to track
 * @param params Additional parameters for the conversion
 */
export const trackLineConversion = (conversionId: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any)._lt) {
    (window as any)._lt('send', 'cv', { 
      conversionId: conversionId,
      ...params
    });
  }
}; 