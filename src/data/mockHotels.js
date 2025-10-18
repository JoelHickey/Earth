/**
 * Mock hotel data for Dream Flow
 * Separated from components for easier testing and maintenance
 */

export const generateHotelUpgrades = (liveInventory) => {
  const currentPrice = 450;
  const nights = 5;
  
  return [
    { 
      name: "Ocean Suite", 
      type: "Upgrade", 
      price: "$625", 
      priceNum: 625, 
      match: 99, 
      badge: "Available", 
      color: "#34c759", 
      available: `${liveInventory.room1} left`, 
      features: ["Ocean View", "Living Room", "Balcony"], 
      lastBooked: "4m ago by Maria T.", 
      roomKey: 'room1', 
      inventory: liveInventory.room1, 
      currentPrice, 
      nights, 
      source: "Hilton API" 
    },
    { 
      name: "Premium King", 
      type: "Upgrade", 
      price: "$520", 
      priceNum: 520, 
      match: 95, 
      badge: "Available", 
      color: "#34c759", 
      available: `${liveInventory.room2} left`, 
      features: ["Partial Ocean", "King Bed"], 
      lastBooked: "12m ago by John D.", 
      roomKey: 'room2', 
      inventory: liveInventory.room2, 
      currentPrice, 
      nights, 
      source: "Hilton API" 
    },
    { 
      name: "Garden View Suite", 
      type: "Upgrade", 
      price: "$580", 
      priceNum: 580, 
      match: 92, 
      badge: "Available", 
      color: "#0071e3", 
      available: `${liveInventory.room3} left`, 
      features: ["Garden View", "Suite"], 
      lastBooked: "28m ago by Lisa K.", 
      roomKey: 'room3', 
      inventory: liveInventory.room3, 
      currentPrice, 
      nights, 
      source: "Hilton API" 
    }
  ].filter(room => room.inventory > 0);
};

export const generateDifferentHotels = () => {
  const currentPrice = 450;
  const nights = 5;
  
  return [
    { 
      name: "Four Seasons Hualalai", 
      type: "King Room · Same Dates", 
      price: "$850/nt", 
      priceNum: 850, 
      match: 98, 
      badge: "Luxury", 
      color: "#667eea", 
      available: "3 rooms left", 
      features: ["5-star", "Beachfront", "Golf"], 
      currentPrice, 
      nights, 
      source: "Sabre GDS" 
    },
    { 
      name: "Fairmont Orchid", 
      type: "King Room · Same Dates", 
      price: "$625/nt", 
      priceNum: 625, 
      match: 95, 
      badge: "Available", 
      color: "#0071e3", 
      available: "8 rooms left", 
      features: ["Resort", "Spa", "Pools"], 
      currentPrice, 
      nights, 
      source: "Amadeus" 
    },
    { 
      name: "Grand Hyatt Kauai", 
      type: "King Room · Same Dates", 
      price: "$580/nt", 
      priceNum: 580, 
      match: 92, 
      badge: "Value", 
      color: "#34c759", 
      available: "12 rooms left", 
      features: ["Family", "Beach", "Activities"], 
      currentPrice, 
      nights, 
      source: "Direct API" 
    }
  ];
};

