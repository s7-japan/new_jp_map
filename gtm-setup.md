# Google Tag Manager Integration Guide

This guide explains how to set up and use Google Tag Manager (GTM) with this project.

## Getting a GTM Container ID

1. **Create a Google Tag Manager Account:**
   - Go to [Google Tag Manager](https://tagmanager.google.com/)
   - Sign in with your Google account
   - Click "Create Account"

2. **Set Up Your Account:**
   - Enter an account name (usually your company name)
   - Enter a container name (usually your website name)
   - Select "Web" as the target platform
   - Click "Create"

3. **Accept the Terms of Service**

4. **Get Your GTM Container ID:**
   - After creating your container, you'll see your GTM ID displayed at the top of the page
   - It looks like `GTM-XXXXXXX`
   - This is the ID you'll need to use in this project

## Implementing GTM in This Project

1. **Update the GTM_ID:**
   - Open the file `src/lib/gtm.ts`
   - Replace the placeholder `GTM-XXXXXXX` with your actual GTM ID:
   ```typescript
   export const GTM_ID = 'GTM-XXXXXXX'; // Replace with your actual GTM ID
   ```

2. **Verify Integration:**
   - Run your application
   - Use the Google Tag Assistant or Chrome DevTools to verify that GTM is loaded correctly
   - Look for the GTM script in the Network tab of Chrome DevTools

## Using GTM for Event Tracking

The integration includes helper functions to make tracking events easy:

1. **Track a Custom Event:**
   ```typescript
   import { trackEvent } from '@/lib/analytics';
   
   // Track a custom event
   trackEvent('event_name', { 
     property1: 'value1',
     property2: 'value2'
   });
   ```

2. **Track Button Clicks:**
   ```typescript
   import { trackButtonClick } from '@/lib/analytics';
   
   // In your button click handler
   trackButtonClick('button_name', 'location_on_page');
   ```

3. **Track Form Submissions:**
   ```typescript
   import { trackFormSubmit } from '@/lib/analytics';
   
   // After successful form submission
   trackFormSubmit('form_name', 'success');
   
   // Or after failed form submission
   trackFormSubmit('form_name', 'error');
   ```

## Setting Up Tags in Google Tag Manager

1. **Create Variables:**
   - In GTM, go to "Variables" and create Custom Variables for the data you want to track

2. **Create Triggers:**
   - In GTM, go to "Triggers" and create triggers based on your events
   - For example, create a trigger that fires on the Custom Event "button_click"

3. **Create Tags:**
   - In GTM, go to "Tags" and create tags for analytics platforms (Google Analytics, Facebook Pixel, etc.)
   - Associate tags with your triggers
   - Configure the tags to send the data you want to track

4. **Test and Publish:**
   - Use GTM's Preview mode to test your tags
   - When everything works as expected, publish your changes

## Example Component

Check out the `TrackingExample.tsx` component for a practical example of how to implement event tracking in your components.

## Debugging GTM

1. **Enable GTM Debug Mode:**
   - Add `?gtm_debug=x` to your URL
   - This enables GTM's debug mode, which provides more information in the console

2. **Use Tag Assistant:**
   - Install the [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk) Chrome extension
   - Use it to verify that your GTM container is working correctly 