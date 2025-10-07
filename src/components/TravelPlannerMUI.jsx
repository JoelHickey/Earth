import React, { useState } from 'react';
import {
  ThemeProvider,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { Close, Minimize, Hotel, Shield, Edit } from '@mui/icons-material';
import muiTheme from '../theme/muiTheme';

const TravelPlannerMUI = ({
  isOpen,
  onClose,
  onMinimize,
  position,
  onDragStart,
  isMinimized
}) => {
  // Trip data
  const [tripData] = useState({
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
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'move',
              borderRadius: '16px 16px 0 0',
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
                  minWidth: '28px',
                  height: '28px',
                  padding: '0',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '12px',
                  borderRadius: '6px',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Minimize sx={{ fontSize: '14px' }} />
              </Button>
              <Button
                size="small"
                onClick={onClose}
                sx={{
                  minWidth: '28px',
                  height: '28px',
                  padding: '0',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '12px',
                  borderRadius: '6px',
                  '&:hover': { 
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Close sx={{ fontSize: '14px' }} />
              </Button>
            </Box>
          </Box>

          {/* Content Area */}
          <CardContent sx={{ 
            flex: 1, 
            overflow: 'auto', 
            padding: '16px',
            backgroundColor: '#f8fafc',
          }}>
            {/* Trip Information Section */}
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="h5" gutterBottom sx={{ 
                color: '#1e293b', 
                fontWeight: '600',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '18px',
              }}>
                📋 Trip Information
              </Typography>
              
              <Card sx={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600', 
                        marginBottom: '6px',
                        color: '#64748b',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        Destination
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: '500',
                        color: '#1e293b',
                        fontSize: '14px',
                      }}>
                        {tripData.destination}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600', 
                        marginBottom: '6px',
                        color: '#64748b',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        Dates
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: '500',
                        color: '#1e293b',
                        fontSize: '14px',
                      }}>
                        {tripData.dates}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600', 
                        marginBottom: '6px',
                        color: '#64748b',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        Travelers
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: '500',
                        color: '#1e293b',
                        fontSize: '14px',
                      }}>
                        {tripData.travelers} adults
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600', 
                        marginBottom: '6px',
                        color: '#64748b',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        Budget
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: '500',
                        color: '#1e293b',
                        fontSize: '14px',
                      }}>
                        {tripData.budget}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ 
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      border: '1px solid #bae6fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: '600',
                        color: '#0369a1',
                        fontSize: '11px',
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
                          fontSize: '11px',
                          height: '24px',
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Box>

            {/* Travel Components Section */}
            <Box>
              <Typography variant="h5" gutterBottom sx={{ 
                color: '#1e293b', 
                fontWeight: '600',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '18px',
              }}>
                🧳 Travel Components
              </Typography>
              
              <Box sx={{ marginBottom: '16px' }}>
                {components.map((component) => (
                  <Card key={component.id} sx={{ 
                    marginBottom: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                      transform: 'translateY(-2px)',
                      borderColor: '#cbd5e1',
                    },
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Box sx={{ 
                          padding: '8px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '8px',
                          color: '#6366f1',
                        }}>
                          {component.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ 
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '2px',
                            fontSize: '16px',
                          }}>
                            {component.name}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            color: '#64748b',
                            fontSize: '12px',
                          }}>
                            {component.details}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Chip 
                          label={component.status} 
                          size="small"
                          sx={{
                            backgroundColor: component.status === 'Booked' ? '#10b981' : '#f1f5f9',
                            color: component.status === 'Booked' ? '#ffffff' : '#475569',
                            fontWeight: '600',
                            borderRadius: '16px',
                            fontSize: '11px',
                            height: '24px',
                          }}
                        />
                        <Button
                          size="small"
                          startIcon={<Edit />}
                          sx={{
                            backgroundColor: '#f1f5f9',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
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
                    </Box>
                  </Card>
                ))}
              </Box>

              {/* Add Component Buttons */}
              <Box sx={{ 
                display: 'flex', 
                gap: '12px', 
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <Button
                  variant="outlined"
                  startIcon={<Hotel />}
                  sx={{
                    backgroundColor: '#ffffff',
                    border: '2px dashed #6366f1',
                    color: '#6366f1',
                    borderRadius: '8px',
                    padding: '12px 18px',
                    fontSize: '12px',
                    fontWeight: '600',
                    minWidth: '140px',
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                      borderColor: '#4f46e5',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  + Add Hotel
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Shield />}
                  sx={{
                    backgroundColor: '#ffffff',
                    border: '2px dashed #10b981',
                    color: '#10b981',
                    borderRadius: '8px',
                    padding: '12px 18px',
                    fontSize: '12px',
                    fontWeight: '600',
                    minWidth: '140px',
                    '&:hover': {
                      backgroundColor: '#f0fdf4',
                      borderColor: '#059669',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  + Add Insurance
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default TravelPlannerMUI;
