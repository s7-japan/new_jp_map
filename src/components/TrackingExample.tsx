'use client';

import { useState } from 'react';
import { trackButtonClick, trackFormSubmit } from '@/lib/analytics';

export default function TrackingExample() {
  const [formData, setFormData] = useState('');
  
  // Example of tracking a button click
  const handleButtonClick = () => {
    // Your button logic here
    console.log('Button clicked');
    
    // Track the event
    trackButtonClick('example_button', 'tracking_example_component');
  };
  
  // Example of tracking a form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Your form submission logic here
    console.log('Form submitted with data:', formData);
    
    // Track the event
    trackFormSubmit('example_form', 'success');
    
    // Reset form
    setFormData('');
  };
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">GTM Tracking Example</h2>
      
      {/* Button Click Example */}
      <div className="mb-4">
        <button 
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Track Button Click
        </button>
      </div>
      
      {/* Form Submit Example */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="example-input" className="block mb-1">Example Input</label>
          <input
            id="example-input"
            type="text"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit and Track
        </button>
      </form>
    </div>
  );
} 