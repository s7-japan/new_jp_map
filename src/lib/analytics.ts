import { pushEvent } from './gtm';

/**
 * Track a custom event with Google Tag Manager
 * 
 * @param eventName Name of the event
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  pushEvent({
    event: eventName,
    ...eventParams
  });
};

/**
 * Examples of common events you might want to track
 */

// Track button click
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation || 'not specified'
  });
};

// Track form submission
export const trackFormSubmit = (formName: string, formStatus: 'success' | 'error' = 'success') => {
  trackEvent('form_submit', {
    form_name: formName,
    form_status: formStatus
  });
};

// Track page view (can be called manually if needed)
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle
  });
}; 