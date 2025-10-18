import React from 'react';
import Card from './Card';
import Button from './Button';

const ProviderCard = ({ 
  provider,
  onSelect,
  isConfirming = false,
  isAIPick = false
}) => {
  return (
    <Card compact hoverable>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Provider name + AI pick badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1px' }}>
            <div style={{ fontSize: '9px', fontWeight: '600', color: '#1d1d1f' }}>
              {provider.provider}
            </div>
            {isAIPick && (
              <span style={{
                fontSize: '6px',
                padding: '1px 3px',
                background: '#34c759',
                color: '#ffffff',
                borderRadius: '2px',
                fontWeight: '600'
              }}>
                AI PICK
              </span>
            )}
          </div>
          
          {/* Plan details */}
          <div style={{ fontSize: '7px', color: '#86868b' }}>
            {provider.plan}
            {provider.medical && <span style={{ color: '#ff3b30', fontWeight: '600' }}> · 🏥 Pre-existing</span>}
          </div>
          
          {/* Score and commission */}
          <div style={{ fontSize: '7px', color: '#86868b', marginTop: '2px' }}>
            Score {provider.score}/10 · Commission {provider.commission} ({provider.commissionRate})
          </div>
        </div>
        
        {/* Price + Select button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#1d1d1f' }}>
              {provider.price}
            </div>
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

export default ProviderCard;

