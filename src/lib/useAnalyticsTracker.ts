import { useCallback } from 'react';
import { event } from './gtag';

interface TrackEventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Custom hook for tracking Google Analytics events
 * 
 * @returns A function to track events
 * 
 * @example
 * const trackEvent = useAnalyticsTracker();
 * 
 * // Track a button click
 * const handleClick = () => {
 *   trackEvent({
 *     action: 'button_click',
 *     category: 'engagement',
 *     label: 'submit_button'
 *   });
 * };
 */
export function useAnalyticsTracker() {
  const trackEvent = useCallback(({ action, category, label, value }: TrackEventProps) => {
    event({
      action,
      category,
      label,
      value
    });
  }, []);

  return trackEvent;
}

/**
 * Pre-configured trackers for common events
 */
export const trackButtonClick = (buttonName: string) => {
  event({
    action: 'button_click',
    category: 'engagement',
    label: buttonName
  });
};

export const trackFormSubmit = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'engagement',
    label: formName
  });
};

export const trackMapInteraction = (interactionType: string, locationName?: string) => {
  event({
    action: interactionType,
    category: 'map_interaction',
    label: locationName
  });
}; 