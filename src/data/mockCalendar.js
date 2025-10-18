/**
 * Mock calendar data for date selection
 * Generates 4 months of availability data
 */

export const generateCalendarMonths = (startDate, endDate) => {
  return [
    {
      name: 'MARCH',
      emptyStart: 5, // March 2025 starts on Saturday
      days: Array.from({length: 31}, (_, i) => {
        const date = i + 1;
        const isCurrent = date >= startDate && date <= endDate;
        let price = 450;
        let avail = 'high';
        
        // Weekend pricing
        if ([7,8,14,15,20,21].includes(date)) {
          price = 480;
          avail = 'medium';
        }
        if ([30,31].includes(date)) {
          price = 520;
          avail = date === 31 ? 'low' : 'high';
        }
        
        return { 
          date, 
          price, 
          avail: isCurrent ? 'current' : avail,
          current: isCurrent
        };
      })
    },
    {
      name: 'APRIL',
      emptyStart: 1,
      days: Array.from({length: 30}, (_, i) => ({
        date: i + 1,
        price: i < 2 ? 520 : i % 7 === 0 ? 480 : 450,
        avail: i < 2 ? 'sold' : i % 7 === 0 ? 'medium' : i % 10 === 0 ? 'low' : 'high'
      }))
    },
    {
      name: 'MAY',
      emptyStart: 3,
      days: Array.from({length: 31}, (_, i) => ({
        date: i + 1,
        price: i % 9 === 0 ? 520 : i % 6 === 0 ? 480 : 450,
        avail: i === 25 ? 'sold' : i % 9 === 0 ? 'low' : i % 6 === 0 ? 'medium' : 'high'
      }))
    },
    {
      name: 'JUNE',
      emptyStart: 6,
      days: Array.from({length: 30}, (_, i) => ({
        date: i + 1,
        price: i % 8 === 0 ? 520 : i % 5 === 0 ? 480 : 450,
        avail: i === 26 ? 'sold' : i % 8 === 0 ? 'low' : i % 5 === 0 ? 'medium' : 'high'
      }))
    }
  ];
};

