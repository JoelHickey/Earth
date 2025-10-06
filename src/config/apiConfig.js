// API Configuration
// Copy this file to apiConfig.local.js and add your actual API keys

export const API_CONFIG = {
  // Amadeus API (Recommended for flights and hotels)
  AMADEUS: {
    BASE_URL: 'https://test.api.amadeus.com',
    API_KEY: import.meta.env.VITE_AMADEUS_API_KEY || 'YOUR_AMADEUS_API_KEY',
    API_SECRET: import.meta.env.VITE_AMADEUS_API_SECRET || 'YOUR_AMADEUS_API_SECRET',
  },
  
  // Skyscanner API (Alternative for flights)
  SKYSCANNER: {
    BASE_URL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    API_KEY: import.meta.env.VITE_SKYSCANNER_API_KEY || 'YOUR_SKYSCANNER_API_KEY',
  },
  
  // Booking.com API (Alternative for hotels)
  BOOKING: {
    BASE_URL: 'https://distribution-xml.booking.com',
    API_KEY: import.meta.env.VITE_BOOKING_API_KEY || 'YOUR_BOOKING_API_KEY',
  },
};

// API Setup Instructions:
// 1. Go to https://developers.amadeus.com/
// 2. Create a free account
// 3. Get your API key and secret
// 4. Create a .env file in your project root with:
//    VITE_AMADEUS_API_KEY=your_actual_api_key
//    VITE_AMADEUS_API_SECRET=your_actual_api_secret
// 5. Restart your dev server

export default API_CONFIG;
