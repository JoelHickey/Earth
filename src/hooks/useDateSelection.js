import { useState } from 'react';

/**
 * Custom hook to manage calendar date selection
 * Handles start/end date selection and preset calculations
 */
const useDateSelection = (defaultStart = 22, defaultEnd = 27) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Handle clicking a date on the calendar
  const handleDateClick = (date) => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate) {
      if (date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    } else {
      // Reset and start over
      setStartDate(date);
      setEndDate(null);
    }
  };
  
  // Apply preset date changes (from pills)
  const applyPreset = (preset) => {
    switch(preset) {
      case 'Extend +1':
        setStartDate(defaultStart);
        setEndDate(defaultEnd + 1);
        break;
      case 'Shorten -1':
        setStartDate(defaultStart);
        setEndDate(defaultEnd - 1);
        break;
      case 'Shift +3':
        setStartDate(defaultStart + 3);
        setEndDate(defaultEnd + 3);
        break;
      default:
        setStartDate(defaultStart);
        setEndDate(defaultEnd);
    }
  };
  
  // Calculate price difference
  const calculatePriceDifference = (pricePerNight = 450) => {
    const currentStart = startDate || defaultStart;
    const currentEnd = endDate || defaultEnd;
    const currentNights = currentEnd - currentStart + 1;
    const originalNights = defaultEnd - defaultStart + 1;
    const nightsDiff = currentNights - originalNights;
    
    return nightsDiff * pricePerNight;
  };
  
  // Reset selection
  const reset = () => {
    setStartDate(null);
    setEndDate(null);
  };
  
  return {
    startDate: startDate || defaultStart,
    endDate: endDate || defaultEnd,
    hasManualSelection: startDate !== null || endDate !== null,
    handleDateClick,
    applyPreset,
    calculatePriceDifference,
    reset
  };
};

export default useDateSelection;

