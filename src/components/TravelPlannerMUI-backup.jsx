import React, { useState } from 'react';
import {
  ThemeProvider,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  FlightTakeoff,
  Hotel,
  DirectionsCar,
  Restaurant,
  Shield,
  Edit,
  Add,
  Search,
  Person,
  CalendarToday,
  AttachMoney,
} from '@mui/icons-material';
import muiTheme from '../theme/muiTheme';

const TravelPlannerMUI = ({ 
  isOpen, 
  onClose, 
  onMinimize, 
  position, 
  onDragStart,
  isMinimized 
}) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isQuickAmendSearch, setIsQuickAmendSearch] = useState(false);
  const [isRoomSelectionLoading, setIsRoomSelectionLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTravelersPageOpen, setIsTravelersPageOpen] = useState(false);
  const [isPaymentPageOpen, setIsPaymentPageOpen] = useState(false);
  const [isLightningPageOpen, setIsLightningPageOpen] = useState(false);
  const [isLightningCheckoutOpen, setIsLightningCheckoutOpen] = useState(false);
  const [isSearchingModalOpen, setIsSearchingModalOpen] = useState(false);
  const [showAllHotels, setShowAllHotels] = useState(false);

  // Trip data
  const [tripData, setTripData] = useState({
    destination: 'Miami Beach, FL',
    dates: 'Jan 15-18, 2024',
    travelers: 2,
    budget: '$150-200/night',
    status: 'Confirmed'
  });

  // Components data
  const [components] = useState([
    {
      id: 'hotel',
      type: 'Hotel',
      name: 'Grand Plaza Resort',
      icon: <Hotel />,
      details: 'Ocean View Suite • $189/night',
      status: 'Booked'
    },
    {
      id: 'insurance',
      type: 'Insurance',
      name: 'Travel Protection',
      icon: <Shield />,
      details: 'Comprehensive Coverage',
      status: 'Available'
    }
  ]);

  const selectRoom = async (roomData) => {
    setIsRoomSelectionLoading(true);
    
    // Simulate room selection processing
    const loadingDelay = Math.random() * 1500 + 1000; // 1-2.5 seconds
    
    try {
      await new Promise(resolve => setTimeout(resolve, loadingDelay));
      setIsRoomSelectionLoading(false);
      // Navigate to checkout or show success
      alert(`Room selected: ${roomData.name}`);
    } catch (error) {
      console.error('Room selection failed:', error);
      setIsRoomSelectionLoading(false);
    }
  };

  const openQuickAmend = () => {
    setIsQuickAmendSearch(true);
    setIsSearchResultsOpen(true);
    setCartItems([{
      id: 'current-booking',
      name: 'Grand Plaza Resort',
      rating: '★★★★☆',
      address: '123 Beach Drive, Miami Beach, FL',
      city: 'Miami Beach',
      country: 'US',
      amenities: ['Pool', 'Beach Access', 'Restaurant', 'WiFi', 'Parking', 'Spa'],
      description: 'Luxury beachfront resort with stunning ocean views.',
      price: '$189',
      currency: 'USD',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      roomType: 'Ocean View Suite',
      cancellationPolicy: 'Free cancellation until Jan 10',
      bookingLink: '#'
    }]);
  };

  const openLightningPage = () => {
    setIsLightningPageOpen(true);
  };

  const closeLightningPage = () => {
    setIsLightningPageOpen(false);
  };

  const openLightningCheckout = (hotelData) => {
    setCartItems([hotelData]);
    setIsLightningCheckoutOpen(true);
  };

  const closeLightningCheckout = () => {
    setIsLightningCheckoutOpen(false);
  };

  const openSearchingModal = (isQuickAmend = false) => {
    setIsQuickAmendSearch(isQuickAmend);
    setIsSearchingModalOpen(true);
  };

  const closeSearchingModal = () => {
    setIsSearchingModalOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openTravelersPage = () => {
    setIsTravelersPageOpen(true);
  };

  const closeTravelersPage = () => {
    setIsTravelersPageOpen(false);
  };

  const openPaymentPage = () => {
    setIsPaymentPageOpen(true);
  };

  const closePaymentPage = () => {
    setIsPaymentPageOpen(false);
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    setSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearching(false);
      setSearchModalOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <ThemeProvider theme={muiTheme}>
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '800px',
          height: '600px',
          zIndex: 1000,
          display: isMinimized ? 'none' : 'block',
        }}
        onMouseDown={onDragStart}
      >
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Window Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'move',
              borderRadius: '20px 20px 0 0',
            }}
          >
            <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              ✈️ Travel Planner
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Button
                size="small"
                onClick={onMinimize}
                sx={{
                  minWidth: '32px',
                  height: '32px',
                  padding: '0',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '14px',
                  borderRadius: '8px',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Minimize sx={{ fontSize: '16px' }} />
              </Button>
              <Button
                size="small"
                onClick={onClose}
                sx={{
                  minWidth: '32px',
                  height: '32px',
                  padding: '0',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '14px',
                  borderRadius: '8px',
                  '&:hover': { 
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Close sx={{ fontSize: '16px' }} />
              </Button>
            </Box>
          </Box>


          {/* Content Area */}
          <CardContent sx={{ 
            flex: 1, 
            overflow: 'auto', 
            padding: '24px',
            backgroundColor: '#f8fafc',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f5f9',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#cbd5e1',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#94a3b8',
              },
            },
          }}>
            
            {/* Main Trip Info & Components */}
            {!isSearchResultsOpen && !isCartOpen && !isTravelersPageOpen && !isPaymentPageOpen && !isLightningPageOpen && !isLightningCheckoutOpen && (
              <Box>
                {/* Trip Information Section */}
                <Box sx={{ marginBottom: '32px' }}>
                  <Typography variant="h4" gutterBottom sx={{ 
                    color: '#1e293b', 
                    fontWeight: '600',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    📋 Trip Information
                  </Typography>
                  
                  <Card sx={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  }}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            color: '#64748b',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Destination
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontWeight: '500',
                            color: '#1e293b',
                            fontSize: '16px',
                          }}>
                            {tripData.destination}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            color: '#64748b',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Dates
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontWeight: '500',
                            color: '#1e293b',
                            fontSize: '16px',
                          }}>
                            {tripData.dates}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            color: '#64748b',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Travelers
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontWeight: '500',
                            color: '#1e293b',
                            fontSize: '16px',
                          }}>
                            {tripData.travelers} adults
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            color: '#64748b',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Budget
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontWeight: '500',
                            color: '#1e293b',
                            fontSize: '16px',
                          }}>
                            {tripData.budget}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ 
                          padding: '16px',
                          backgroundColor: '#f0f9ff',
                          borderRadius: '12px',
                          border: '1px solid #bae6fd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: '600',
                            color: '#0369a1',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Status
                          </Typography>
                          <Chip 
                            label={tripData.status} 
                            color="primary" 
                            size="small"
                            sx={{
                              backgroundColor: '#10b981',
                              color: '#ffffff',
                              fontWeight: '600',
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>

                {/* Travel Components Section */}
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ 
                    color: '#1e293b', 
                    fontWeight: '600',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    🧳 Travel Components
                  </Typography>
                  
                  <List>
                    {components.map((component, index) => (
                      <React.Fragment key={component.id}>
                        <ListItem
                          sx={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            marginBottom: '12px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                              transform: 'translateY(-2px)',
                              borderColor: '#cbd5e1',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ListItemIcon>
                              {component.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={component.name}
                              secondary={component.details}
                              primaryTypographyProps={{ fontSize: '12px', fontWeight: 'bold' }}
                              secondaryTypographyProps={{ fontSize: '10px' }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', gap: '12px' }}>
                            <Chip 
                              label={component.status} 
                              size="small"
                              sx={{
                                backgroundColor: component.status === 'Booked' ? '#10b981' : '#f1f5f9',
                                color: component.status === 'Booked' ? '#ffffff' : '#475569',
                                fontWeight: '600',
                                borderRadius: '20px',
                              }}
                            />
                            {component.id === 'hotel' && (
                              <Button
                                size="small"
                                onClick={openLightningPage}
                                sx={{ 
                                  minWidth: '40px',
                                  height: '40px',
                                  padding: '0',
                                  backgroundColor: '#fef3c7',
                                  border: '1px solid #f59e0b',
                                  borderRadius: '12px',
                                  color: '#92400e',
                                  fontSize: '18px',
                                  '&:hover': {
                                    backgroundColor: '#fde68a',
                                    transform: 'scale(1.05)',
                                  },
                                }}
                              >
                                ⚡
                              </Button>
                            )}
                            <Button
                              size="small"
                              startIcon={<Edit />}
                              onClick={() => setSearchModalOpen(true)}
                              sx={{
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                '&:hover': {
                                  backgroundColor: '#e2e8f0',
                                  transform: 'translateY(-1px)',
                                },
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>

                  {/* Add Component Buttons */}
                  <Box sx={{ 
                    marginTop: '24px', 
                    display: 'flex', 
                    gap: '16px', 
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                    <Button
                      variant="outlined"
                      startIcon={<Hotel />}
                      onClick={() => setSearchModalOpen(true)}
                      sx={{
                        backgroundColor: '#ffffff',
                        border: '2px dashed #6366f1',
                        color: '#6366f1',
                        borderRadius: '12px',
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        minWidth: '160px',
                        '&:hover': {
                          backgroundColor: '#f8fafc',
                          borderColor: '#4f46e5',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      + Add Hotel
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Shield />}
                      onClick={() => setSearchModalOpen(true)}
                      sx={{
                        backgroundColor: '#ffffff',
                        border: '2px dashed #10b981',
                        color: '#10b981',
                        borderRadius: '12px',
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        minWidth: '160px',
                        '&:hover': {
                          backgroundColor: '#f0fdf4',
                          borderColor: '#059669',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      + Add Insurance
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Search Results Page */}
            {isSearchResultsOpen && (
              /* Search Results */
              <Box>
                {/* Search Results Header */}
                <Box sx={{
                  backgroundColor: '#d4d0c8',
                  border: '1px inset #c0c0c0',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Home</span>
                      <span>›</span>
                      <span style={{ color: '#000080', fontWeight: 'bold' }}>{isQuickAmendSearch ? 'Quick Edit' : 'Search Results'}</span>
                      <span>›</span>
                      <span>Cart</span>
                      <span>›</span>
                      <span>Travelers</span>
                      <span>›</span>
                      <span>Payment</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      🔍 Hotel Search Results - Miami Beach, FL
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => {
                      setIsSearchResultsOpen(false);
                      setIsQuickAmendSearch(false);
                    }}
                    sx={{ fontSize: '9px', fontWeight: 'bold' }}
                  >
                    ✕ Back to Trip
                  </Button>
                </Box>

                {/* Current Booking (Quick Amend) */}
                {isQuickAmendSearch && cartItems.length > 0 && cartItems[0].id === 'current-booking' && (
                  <Card sx={{ marginBottom: '8px', border: '2px outset #000080', backgroundColor: '#f0f8ff' }}>
                    <CardContent>
                      {/* Hotel Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <Box>
                          <Typography variant="h6" sx={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold' }}>
                            🏨 {cartItems[0].name}
                          </Typography>
                          <Typography variant="body2" sx={{ margin: '0 0 4px 0', fontSize: '10px', color: '#000080' }}>
                            {cartItems[0].rating} • Miami Beach, FL
                          </Typography>
                          <Typography variant="body2" sx={{ margin: '0', fontSize: '10px' }}>
                            {cartItems[0].address}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 'bold', color: '#000080' }}>
                            From $189/night
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080' }}>
                            {cartItems[0].checkIn} - {cartItems[0].checkOut}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Room Options */}
                      <Box sx={{ marginBottom: '12px' }}>
                        <Typography variant="h6" sx={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: 'bold', color: '#000080' }}>
                          Available Rooms:
                        </Typography>
                        
                        {/* Room 1 - Current Booking (Pre-selected) */}
                        <Card sx={{ border: '2px outset #000080', backgroundColor: '#f0f8ff', marginBottom: '6px' }}>
                          <CardContent sx={{ padding: '8px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                                  ✓ Ocean View Suite (Current Booking)
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '9px', color: '#000080' }}>
                                  King bed • Ocean view • 450 sq ft
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '9px', color: '#008000', fontWeight: 'bold' }}>
                                  ✓ {cartItems[0].cancellationPolicy}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
                                  $189/night
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080' }}>
                                  Total: $567
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>

                          {/* Room 2 - Alternative Option */}
                          <Card sx={{ marginBottom: '6px', cursor: 'pointer' }}
                                onClick={() => {
                                  setCartItems([{
                                    id: 'deluxe-room',
                                    name: 'Grand Plaza Resort - Deluxe Room',
                                    rating: '★★★★☆',
                                    address: '123 Beach Drive, Miami Beach, FL',
                                    city: 'Miami Beach',
                                    country: 'US',
                                    amenities: ['Pool', 'Beach Access', 'Restaurant', 'WiFi', 'Parking', 'Spa'],
                                    description: 'Deluxe room with partial ocean view.',
                                    price: '$165',
                                    currency: 'USD',
                                    checkIn: '2024-01-15',
                                    checkOut: '2024-01-18',
                                    roomType: 'Deluxe Room',
                                    cancellationPolicy: 'Free cancellation until Jan 10',
                                    bookingLink: '#'
                                  }]);
                                  setIsSearchResultsOpen(false);
                                  setIsCartOpen(true);
                                }}>
                            <CardContent sx={{ padding: '8px' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                                    Deluxe Room
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '9px', color: '#000080' }}>
                                    Queen bed • Partial ocean view • 350 sq ft
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '9px', color: '#666666' }}>
                                    Free cancellation until Jan 10
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
                                    $165/night
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080' }}>
                                    Total: $495
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>

                          {/* Room 3 - Budget Option */}
                          <Card sx={{ marginBottom: '6px', cursor: 'pointer' }}
                                onClick={() => {
                                  setCartItems([{
                                    id: 'standard-room',
                                    name: 'Grand Plaza Resort - Standard Room',
                                    rating: '★★★★☆',
                                    address: '123 Beach Drive, Miami Beach, FL',
                                    city: 'Miami Beach',
                                    country: 'US',
                                    amenities: ['Pool', 'Beach Access', 'Restaurant', 'WiFi', 'Parking', 'Spa'],
                                    description: 'Standard room with garden view.',
                                    price: '$142',
                                    currency: 'USD',
                                    checkIn: '2024-01-15',
                                    checkOut: '2024-01-18',
                                    roomType: 'Standard Room',
                                    cancellationPolicy: 'Free cancellation until Jan 10',
                                    bookingLink: '#'
                                  }]);
                                  setIsSearchResultsOpen(false);
                                  setIsCartOpen(true);
                                }}>
                            <CardContent sx={{ padding: '8px' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                                    Standard Room
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '9px', color: '#000080' }}>
                                    King bed • Garden view • 300 sq ft
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '9px', color: '#666666' }}>
                                    Free cancellation until Jan 10
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
                                    $142/night
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080' }}>
                                    Total: $426
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                      </Box>

                      <Box sx={{ marginBottom: '8px' }}>
                        <Typography variant="body2" sx={{ margin: '0 0 4px 0', fontSize: '10px' }}>
                          <strong>Amenities:</strong> {cartItems[0].amenities.join(' • ')}
                        </Typography>
                        <Typography variant="body2" sx={{ margin: '0 0 4px 0', fontSize: '10px' }}>
                          <strong>Description:</strong> {cartItems[0].description}
                        </Typography>
                        <Typography variant="body2" sx={{ margin: '0', fontSize: '9px', color: '#008000', fontWeight: 'bold' }}>
                          ✓ {cartItems[0].cancellationPolicy}
                        </Typography>
                      </Box>

                        <Box sx={{ display: 'flex', gap: '6px' }}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setIsSearchResultsOpen(false);
                              setIsCartOpen(true);
                            }}
                            sx={{ fontSize: '10px', fontWeight: 'bold' }}
                          >
                            Continue with Selected Room
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{ fontSize: '10px' }}
                          >
                            View Full Details
                          </Button>
                        </Box>
                    </CardContent>
                  </Card>
                )}
              </Box>
            )}

            {/* Cart Page */}
            {isCartOpen && (
              /* Cart Page */
              <Box>
                <Box sx={{
                  backgroundColor: '#d4d0c8',
                  border: '1px inset #c0c0c0',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Search Results</span>
                      <span>›</span>
                      <span style={{ color: '#000080', fontWeight: 'bold' }}>Cart</span>
                      <span>›</span>
                      <span>Travelers</span>
                      <span>›</span>
                      <span>Payment</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      🛒 Shopping Cart
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => setIsCartOpen(false)}
                    sx={{ fontSize: '9px', fontWeight: 'bold' }}
                  >
                    ✕ Back to Search
                  </Button>
                </Box>

                {cartItems.length > 0 ? (
                  <Box>
                    {cartItems.map((item, index) => (
                      <Card key={index} sx={{ marginBottom: '8px', border: '2px outset #c0c0c0' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                                🏨 {item.name}
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '10px', color: '#000080' }}>
                                {item.rating} • {item.city}
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '10px' }}>
                                {item.address}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 'bold', color: '#000080' }}>
                                {item.price}/night
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080' }}>
                                {item.checkIn} - {item.checkOut}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setIsCartOpen(false);
                                setIsTravelersPageOpen(true);
                              }}
                              sx={{ fontSize: '10px', fontWeight: 'bold' }}
                            >
                              Continue to Travelers
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => removeFromCart(index)}
                              sx={{ fontSize: '10px' }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', padding: '40px' }}>
                    <Typography variant="h6" sx={{ color: '#808080' }}>
                      Your cart is empty
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setIsCartOpen(false)}
                      sx={{ marginTop: '16px' }}
                    >
                      Back to Search
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {/* Travelers Page */}
            {isTravelersPageOpen && (
              /* Travelers Page */
              <Box>
                <Box sx={{
                  backgroundColor: '#d4d0c8',
                  border: '1px inset #c0c0c0',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Search Results</span>
                      <span>›</span>
                      <span>Cart</span>
                      <span>›</span>
                      <span style={{ color: '#000080', fontWeight: 'bold' }}>Travelers</span>
                      <span>›</span>
                      <span>Payment</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      👥 Traveler Information
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => setIsTravelersPageOpen(false)}
                    sx={{ fontSize: '9px', fontWeight: 'bold' }}
                  >
                    ✕ Back to Cart
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Primary Traveler
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="First Name" defaultValue="John" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Last Name" defaultValue="Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email" defaultValue="john.doe@email.com" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '16px' }}>
                      Additional Travelers
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="First Name" defaultValue="Jane" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Last Name" defaultValue="Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email" defaultValue="jane.doe@email.com" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsTravelersPageOpen(false);
                          setIsPaymentPageOpen(true);
                        }}
                        sx={{ fontSize: '10px', fontWeight: 'bold' }}
                      >
                        Continue to Payment
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsTravelersPageOpen(false)}
                        sx={{ fontSize: '10px' }}
                      >
                        Back to Cart
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Payment Page */}
            {isPaymentPageOpen && (
              /* Payment Page */
              <Box>
                <Box sx={{
                  backgroundColor: '#d4d0c8',
                  border: '1px inset #c0c0c0',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Search Results</span>
                      <span>›</span>
                      <span>Cart</span>
                      <span>›</span>
                      <span>Travelers</span>
                      <span>›</span>
                      <span style={{ color: '#000080', fontWeight: 'bold' }}>Payment</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      💳 Payment Information
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => setIsPaymentPageOpen(false)}
                    sx={{ fontSize: '9px', fontWeight: 'bold' }}
                  >
                    ✕ Back to Travelers
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Payment Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Card Number" defaultValue="**** **** **** 1234" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Expiry Date" defaultValue="12/25" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="CVV" defaultValue="123" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Cardholder Name" defaultValue="John Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsPaymentPageOpen(false);
                          setIsSearchResultsOpen(false);
                          setIsCartOpen(false);
                          setIsTravelersPageOpen(false);
                          alert('Booking confirmed! Returning to trip page.');
                        }}
                        sx={{ fontSize: '10px', fontWeight: 'bold' }}
                      >
                        Complete Booking
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsPaymentPageOpen(false)}
                        sx={{ fontSize: '10px' }}
                      >
                        Back to Travelers
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Lightning Page */}
            {isLightningPageOpen && (
              /* Lightning Page */
              <Box>
                <Box sx={{
                  backgroundColor: '#d4d0c8',
                  border: '1px inset #c0c0c0',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Home</span>
                      <span>›</span>
                      <span style={{ color: '#000080', fontWeight: 'bold' }}>Quick Edit</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      ⚡ Quick Amend - Hotel & Travelers
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => setIsLightningPageOpen(false)}
                    sx={{ fontSize: '9px', fontWeight: 'bold' }}
                  >
                    ✕ Back to Trip
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Travelers
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="First Name" defaultValue="John" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Last Name" defaultValue="Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email" defaultValue="john.doe@email.com" />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '16px' }}>
                      Current Hotel Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ border: '2px outset #c0c0c0', backgroundColor: '#f0f8ff' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                              🏨 Grand Plaza Resort
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '10px', color: '#000080' }}>
                              ★★★★☆ • Miami Beach, FL
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '10px' }}>
                              123 Beach Drive, Miami Beach, FL
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 'bold', color: '#000080' }}>
                              $189/night
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080' }}>
                              Jan 15-18, 2024
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsLightningPageOpen(false);
                          openSearchingModal(true);
                          setTimeout(() => {
                            closeSearchingModal();
                            setIsSearchResultsOpen(true);
                          }, 2000);
                        }}
                        sx={{ fontSize: '10px', fontWeight: 'bold' }}
                      >
                        Search
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsLightningPageOpen(false)}
                        sx={{ fontSize: '10px' }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Lightning Checkout Page */}
            {isLightningCheckoutOpen && (
              /* Lightning Checkout Page */
              <Box>
                <Box sx={{
                  backgroundColor: '#d4d0c8',
                  border: '1px inset #c0c0c0',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography variant="body2" sx={{ fontSize: '9px', color: '#808080', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Home</span>
                      <span>›</span>
                      <span>Quick Edit</span>
                      <span>›</span>
                      <span style={{ color: '#000080', fontWeight: 'bold' }}>Quick Checkout</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: 'bold' }}>
                      ⚡ Quick Checkout - Travelers & Payment
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => setIsLightningCheckoutOpen(false)}
                    sx={{ fontSize: '9px', fontWeight: 'bold' }}
                  >
                    ✕ Back to Search
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Traveler Information
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="First Name" defaultValue="John" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Last Name" defaultValue="Doe" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email" defaultValue="john.doe@email.com" />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '16px' }}>
                      Payment Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Card Number" defaultValue="**** **** **** 1234" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Expiry Date" defaultValue="12/25" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="CVV" defaultValue="123" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Cardholder Name" defaultValue="John Doe" />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsLightningCheckoutOpen(false);
                          setIsSearchResultsOpen(false);
                          alert('Booking confirmed! Returning to trip page.');
                        }}
                        sx={{ fontSize: '10px', fontWeight: 'bold' }}
                      >
                        Complete Quick Booking
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsLightningCheckoutOpen(false)}
                        sx={{ fontSize: '10px' }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Search Modal */}
        <Dialog
          open={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            🔍 Hotel Search
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Destination"
                  defaultValue="Miami Beach, FL"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check-in Date"
                  type="date"
                  defaultValue="2024-01-15"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check-out Date"
                  type="date"
                  defaultValue="2024-01-18"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Guests</InputLabel>
                  <Select defaultValue={2}>
                    <MenuItem value={1}>1 Guest</MenuItem>
                    <MenuItem value={2}>2 Guests</MenuItem>
                    <MenuItem value={3}>3 Guests</MenuItem>
                    <MenuItem value={4}>4 Guests</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Budget Range</InputLabel>
                  <Select defaultValue="$150-200">
                    <MenuItem value="$100-150">$100-150</MenuItem>
                    <MenuItem value="$150-200">$150-200</MenuItem>
                    <MenuItem value="$200-300">$200-300</MenuItem>
                    <MenuItem value="$300+">$300+</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSearchModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={searching}
            >
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Searching Progress Modal */}
        <Dialog open={searching} disableEscapeKeyDown>
          <DialogTitle>
            🔍 Searching Hotels...
          </DialogTitle>
          <DialogContent>
            <Box sx={{ padding: 2 }}>
              <LinearProgress sx={{ marginBottom: 2 }} />
              <Typography variant="body2" gutterBottom>
                Searching 2,500+ hotels in Miami Beach...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please wait while we find the best options for your dates.
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Room Selection Loading Modal */}
        <Dialog open={isRoomSelectionLoading} disableEscapeKeyDown>
          <DialogTitle>
            🏨 Processing Room Selection...
          </DialogTitle>
          <DialogContent>
            <Box sx={{ padding: 2 }}>
              <LinearProgress sx={{ marginBottom: 2 }} />
              <Typography variant="body2" gutterBottom>
                Confirming room availability...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please wait while we process your room selection.
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Searching Progress Modal */}
        <Dialog open={isSearchingModalOpen} disableEscapeKeyDown>
          <DialogTitle>
            🔍 {isQuickAmendSearch ? 'Quick Amend Search...' : 'Searching Hotels...'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ padding: 2 }}>
              <LinearProgress sx={{ marginBottom: 2 }} />
              <Typography variant="body2" gutterBottom>
                {isQuickAmendSearch 
                  ? 'Searching for your current booking modifications...'
                  : 'Searching 2,500+ hotels in Miami Beach...'
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isQuickAmendSearch
                  ? 'Please wait while we find available room options.'
                  : 'Please wait while we find the best options for your dates.'
                }
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default TravelPlannerMUI;
