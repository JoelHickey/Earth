import React, { useState } from 'react';
import {
  ThemeProvider,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Close, Minimize } from '@mui/icons-material';
import muiTheme from '../theme/muiTheme';

const TravelPlannerMUI = ({
  isOpen,
  onClose,
  onMinimize,
  position,
  onDragStart,
  isMinimized
}) => {
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
          }}>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: '600', marginBottom: '16px' }}>
              ✈️ Travel Planner
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Welcome to your modern travel planning experience!
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default TravelPlannerMUI;
