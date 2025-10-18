/**
 * Mock insurance provider data
 * Separated from components for easier testing and maintenance
 */

export const insuranceProviders = [
  { 
    provider: "Allianz", 
    plan: "Comprehensive+ (Medical)", 
    price: "$185", 
    score: 9.4, 
    badge: "AI Pick", 
    color: "#34c759", 
    medical: true, 
    commission: "$32", 
    commissionRate: "17%" 
  },
  { 
    provider: "Covermore", 
    plan: "Premium", 
    price: "$210", 
    score: 9.1, 
    badge: "High Coverage", 
    color: "#0071e3", 
    medical: false, 
    commission: "$29", 
    commissionRate: "14%" 
  },
  { 
    provider: "Travel Guard", 
    plan: "Standard", 
    price: "$145", 
    score: 8.7, 
    badge: "Budget", 
    color: "#ff9500", 
    medical: false, 
    commission: "$18", 
    commissionRate: "12%" 
  }
];

