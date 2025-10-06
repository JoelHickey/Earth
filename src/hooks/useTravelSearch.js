import { useState, useCallback } from 'react';
import travelApi from '../services/travelApi';

// Custom hook for travel search functionality
export const useTravelSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  // Search flights
  const searchFlights = useCallback(async (searchParams) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const flightResults = await travelApi.searchFlights(searchParams);
      setResults(flightResults);
      return flightResults;
    } catch (err) {
      setError(err.message);
      console.error('Flight search error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search hotels
  const searchHotels = useCallback(async (searchParams) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const hotelResults = await travelApi.searchHotels(searchParams);
      setResults(hotelResults);
      return hotelResults;
    } catch (err) {
      setError(err.message);
      console.error('Hotel search error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search cities for autocomplete
  const searchCities = useCallback(async (query) => {
    if (!query || query.length < 2) return [];

    try {
      const cityResults = await travelApi.getCityCodes(query);
      return cityResults;
    } catch (err) {
      console.error('City search error:', err);
      return [];
    }
  }, []);

  // Clear results
  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    results,
    searchFlights,
    searchHotels,
    searchCities,
    clearResults,
  };
};

// Hook for managing search form state
export const useSearchForm = (initialValues = {}) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'ECONOMY',
    ...initialValues,
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      origin: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      adults: 1,
      children: 0,
      infants: 0,
      travelClass: 'ECONOMY',
    });
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.origin) errors.origin = 'Origin is required';
    if (!formData.destination) errors.destination = 'Destination is required';
    if (!formData.departureDate) errors.departureDate = 'Departure date is required';
    
    // Check if return date is after departure date
    if (formData.returnDate && formData.departureDate) {
      if (new Date(formData.returnDate) <= new Date(formData.departureDate)) {
        errors.returnDate = 'Return date must be after departure date';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, [formData]);

  return {
    formData,
    updateField,
    resetForm,
    validateForm,
  };
};

export default useTravelSearch;
