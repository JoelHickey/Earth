import React from 'react';
import Card from './Card';
import Button from './Button';

const HotelCard = ({ 
  hotel,
  onSelect,
  isConfirming = false,
  inventoryChange,
  soldOut = false
}) => {
  return (
    <Card compact hoverable>
      {/* SOLD OUT Overlay */}
      {soldOut && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 59, 48, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          animation: 'slideInLeft 0.3s ease-out',
          borderRadius: '6px'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '900',
            color: '#ffffff',
            letterSpacing: '2px',
            animation: 'pulse 0.5s infinite'
          }}>
            SOLD OUT
          </div>
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Hotel name + source */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1px' }}>
            <div style={{ fontSize: '9px', fontWeight: '600', color: '#1d1d1f' }}>
              {hotel.name}
            </div>
            {hotel.source && (
              <span style={{
                fontSize: '6px',
                padding: '1px 3px',
                background: '#f5f5f7',
                color: '#86868b',
                borderRadius: '2px',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}>
                {hotel.source}
              </span>
            )}
          </div>
          
          {/* Features */}
          <div style={{ fontSize: '7px', color: '#86868b' }}>
            {hotel.features ? hotel.features.join(' · ') : (hotel.type || `${hotel.match}% match`)}
          </div>
          
          {/* Availability info */}
          <div style={{ fontSize: '7px', color: '#86868b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            {inventoryChange && (
              <span style={{
                fontSize: '8px',
                fontWeight: '900',
                color: inventoryChange === 'up' ? '#34c759' : '#ff3b30'
              }}>
                {inventoryChange === 'up' ? '▲' : '▼'}
              </span>
            )}
            <span style={{
              fontSize: '7px',
              color: hotel.available && hotel.available.includes('1 ') ? '#ff3b30' : 
                     hotel.available && hotel.available.includes('2 ') ? '#ff9500' : '#34c759',
              fontWeight: '600'
            }}>
              {hotel.available || ''}
            </span>
            {hotel.lastBooked && (
              <>
                <span style={{ color: '#d1d1d6' }}>·</span>
                <span>Last booked {hotel.lastBooked}</span>
              </>
            )}
          </div>
        </div>
        
        {/* Price + Select button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#1d1d1f' }}>
              {hotel.price}
            </div>
            {hotel.priceNum && hotel.currentPrice && hotel.nights && (
              <div style={{ 
                fontSize: '7px', 
                color: hotel.priceNum > hotel.currentPrice ? '#ff9500' : '#34c759',
                fontWeight: '600'
              }}>
                {hotel.priceNum > hotel.currentPrice ? '+' : ''}{hotel.priceNum - hotel.currentPrice > 0 ? '+$' : '-$'}{Math.abs((hotel.priceNum - hotel.currentPrice) * hotel.nights)}
              </div>
            )}
          </div>
          <Button 
            size="small" 
            onClick={onSelect}
            loading={isConfirming}
          >
            Select
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;

