import { useState } from 'react';

/**
 * Custom hook to manage parent/child pill navigation
 * Handles hierarchical pill selection and state
 */
const usePillNavigation = (defaultPills = []) => {
  const [selectedPill, setSelectedPill] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  const selectPill = (pill) => {
    setSelectedPill(pill);
    setSearchInput(''); // Clear search when pill is clicked
  };
  
  const clearSelection = () => {
    setSelectedPill('');
    setSearchInput('');
  };
  
  // Check if current selection is a date-related pill
  const isDateChangePill = () => {
    return selectedPill === 'Date Change' || 
           selectedPill === 'Extend +1' || 
           selectedPill === 'Shorten -1' || 
           selectedPill === 'Shift +3';
  };
  
  // Get the active input (pill takes priority over search)
  const getActiveInput = () => {
    return selectedPill || searchInput;
  };
  
  return {
    selectedPill,
    searchInput,
    selectPill,
    setSearchInput,
    clearSelection,
    isDateChangePill,
    getActiveInput
  };
};

export default usePillNavigation;

