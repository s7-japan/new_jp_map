# Google Analytics Integration

This document explains how Google Analytics is integrated into the Next.js app to track user interactions.

## Setup

1. The Google Analytics integration is set up in `src/app/layout.js` using the Google Analytics script.
2. The measurement ID is configured in `src/lib/gtag.ts` (currently set to a placeholder value `G-ZW6MWYC0DM`).
3. Replace the placeholder with your actual Google Analytics measurement ID.

## Available Analytics Events

The app currently tracks the following events:

### Navigation Events

- **Page Views**: Automatically tracked when users navigate between pages
- **Menu Toggle**: When users open or close the hamburger menu
- **Menu Item Click**: When users click on any item in the hamburger menu
- **Social Media Link Click**: When users click on social media links
- **Footer Button Click**: When users click on footer navigation buttons

### Custom Event Tracking

A set of utility functions and hooks are available in `src/lib/useAnalyticsTracker.ts` to track custom events:

```typescript
// Import the hook or utility functions
import { 
  useAnalyticsTracker, 
  trackButtonClick, 
  trackFormSubmit, 
  trackMapInteraction 
} from '@/lib/useAnalyticsTracker';

// Using the hook
const trackEvent = useAnalyticsTracker();

// Track a custom event
trackEvent({
  action: 'custom_action',
  category: 'custom_category',
  label: 'custom_label',
  value: 1 // optional numeric value
});

// Or use pre-configured functions
trackButtonClick('submit_button');
trackFormSubmit('contact_form');
trackMapInteraction('zoom', 'Tokyo');
```

## Adding New Event Tracking

To add tracking to a new interactive element:

1. Import the tracking utilities:
   ```typescript
   import { event } from '@/lib/gtag';
   // or
   import { useAnalyticsTracker } from '@/lib/useAnalyticsTracker';
   ```

2. Track the event in your event handler:
   ```typescript
   const handleClick = () => {
     event({
       action: 'button_click',
       category: 'engagement',
       label: 'my_button'
     });
     
     // then perform your original action
   };
   ```

## Google Analytics Dashboard

To view the analytics data:

1. Log in to your Google Analytics account
2. Navigate to the "Reports" section
3. View reports under "Real-time", "Acquisition", "Engagement", etc.
4. For custom events, look under "Events" in the "Engagement" section

## Debugging

To verify that events are being tracked correctly:

1. Open browser developer tools
2. Look for network requests to `www.google-analytics.com`
3. Check the browser console for any errors related to Google Analytics
4. Use the Google Analytics Debugger browser extension 