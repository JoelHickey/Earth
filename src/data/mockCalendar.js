/**
 * Mock calendar data for date selection
 * Generates 3 months of availability data (May–Jul 2024)
 */

export const generateCalendarMonths = (startDate, endDate, activeMonth) => {
  const months = [
    {
      name: 'MAY',
      emptyStart: 3, // May 2024 starts on Wednesday
      days: Array.from({length: 31}, (_, i) => {
        const date = i + 1;
        let price = 450;
        let avail = 'high';
        
        // Weekend pricing
        if ([4,5,11,12,18,19,25,26].includes(date)) {
          price = 480;
          avail = 'medium';
        }
        if ([30,31].includes(date)) {
          price = 520;
          avail = date === 31 ? 'low' : 'high';
        }
        
        return { date, price, avail };
      })
    },
    {
      name: 'JUNE',
      emptyStart: 6,
      days: Array.from({length: 30}, (_, i) => ({
        date: i + 1,
        price: i < 2 ? 520 : i % 7 === 0 ? 480 : 450,
        avail: i < 2 ? 'sold' : i % 7 === 0 ? 'medium' : i % 10 === 0 ? 'low' : 'high'
      }))
    },
    {
      name: 'JULY',
      emptyStart: 1,
      days: Array.from({length: 31}, (_, i) => ({
        date: i + 1,
        price: i % 9 === 0 ? 520 : i % 6 === 0 ? 480 : 450,
        avail: i === 25 ? 'sold' : i % 9 === 0 ? 'low' : i % 6 === 0 ? 'medium' : 'high'
      }))
    }
  ];

  return months;
};

