// Travel API Service for Flights and Hotels
// Using Amadeus API for comprehensive travel data

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';
const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

class TravelApiService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get access token for Amadeus API
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: AMADEUS_API_KEY,
          client_secret: AMADEUS_API_SECRET,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in * 1000);
        return this.accessToken;
      } else {
        throw new Error(`Token request failed: ${data.error_description || data.error}`);
      }
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  // Search for flights
  async searchFlights(searchParams) {
    try {
      const token = await this.getAccessToken();
      
      const params = new URLSearchParams({
        originLocationCode: searchParams.origin,
        destinationLocationCode: searchParams.destination,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults || 1,
        children: searchParams.children || 0,
        infants: searchParams.infants || 0,
        travelClass: searchParams.travelClass || 'ECONOMY',
        currencyCode: searchParams.currency || 'USD',
        max: searchParams.max || 10,
      });

      // Add return date if round trip
      if (searchParams.returnDate) {
        params.append('returnDate', searchParams.returnDate);
      }

      const response = await fetch(`${AMADEUS_BASE_URL}/v2/shopping/flight-offers?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return this.formatFlightResults(data);
      } else {
        throw new Error(`Flight search failed: ${data.errors?.[0]?.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  }

  // Search for hotels
  async searchHotels(searchParams) {
    try {
      const token = await this.getAccessToken();
      
      const params = new URLSearchParams({
        cityCode: searchParams.cityCode,
        checkInDate: searchParams.checkInDate,
        checkOutDate: searchParams.checkOutDate,
        adults: searchParams.adults || 2,
        roomQuantity: searchParams.roomQuantity || 1,
        currency: searchParams.currency || 'USD',
        max: searchParams.max || 10,
      });

      const response = await fetch(`${AMADEUS_BASE_URL}/v1/shopping/hotel-offers?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return this.formatHotelResults(data);
      } else {
        throw new Error(`Hotel search failed: ${data.errors?.[0]?.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  }

  // Format flight results for our UI
  formatFlightResults(data) {
    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map(offer => {
      const itinerary = offer.itineraries[0];
      const segments = itinerary.segments;
      const price = offer.price;
      
      // Calculate total duration
      const departure = new Date(segments[0].departure.at);
      const arrival = new Date(segments[segments.length - 1].arrival.at);
      const duration = Math.round((arrival - departure) / (1000 * 60)); // minutes
      
      // Format duration
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      const durationText = `${hours}h ${minutes}m`;

      return {
        id: offer.id,
        price: price.total,
        currency: price.currency,
        origin: segments[0].departure.iataCode,
        destination: segments[segments.length - 1].arrival.iataCode,
        departureTime: segments[0].departure.at,
        arrivalTime: segments[segments.length - 1].arrival.at,
        duration: durationText,
        stops: segments.length - 1,
        airline: segments[0].carrierCode,
        aircraft: segments[0].aircraft?.code || 'Unknown',
        segments: segments.map(segment => ({
          departure: segment.departure,
          arrival: segment.arrival,
          carrier: segment.carrierCode,
          flightNumber: segment.number,
          aircraft: segment.aircraft?.code,
        })),
        bookingLink: offer.self,
      };
    });
  }

  // Format hotel results for our UI
  formatHotelResults(data) {
    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map(hotel => {
      const offers = hotel.offers || [];
      const bestOffer = offers[0]; // Take the first (usually best) offer
      
      return {
        id: hotel.hotel.hotelId,
        name: hotel.hotel.name,
        rating: hotel.hotel.rating || 'N/A',
        address: hotel.hotel.address?.lines?.[0] || 'Address not available',
        city: hotel.hotel.address?.cityName || 'City not available',
        country: hotel.hotel.address?.countryCode || 'Country not available',
        amenities: hotel.hotel.amenities || [],
        description: hotel.hotel.description?.text || 'No description available',
        images: hotel.hotel.images || [],
        price: bestOffer?.price?.total || 'Price not available',
        currency: bestOffer?.price?.currency || 'USD',
        checkIn: bestOffer?.checkInDate || 'N/A',
        checkOut: bestOffer?.checkOutDate || 'N/A',
        roomType: bestOffer?.room?.type || 'Standard Room',
        cancellationPolicy: bestOffer?.policies?.cancellation || 'Non-refundable',
        bookingLink: bestOffer?.self || '#',
      };
    });
  }

  // Get city codes for autocomplete
  async getCityCodes(query) {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations?subType=CITY&keyword=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return data.data.map(city => ({
          code: city.iataCode,
          name: city.name,
          country: city.address?.countryCode,
          region: city.address?.regionCode,
        }));
      } else {
        throw new Error(`City search failed: ${data.errors?.[0]?.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  }
}

// Create singleton instance
const travelApi = new TravelApiService();

export default travelApi;
