import React from 'react';

const CalendarPicker = ({ 
  startDate,
  endDate,
  onDateClick,
  months = []
}) => {
  return (
    <div style={{ marginTop: '4px' }}>
      {/* Header with navigation */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3px'
      }}>
        <div style={{ 
          fontSize: '7px', 
          color: '#86868b', 
          fontWeight: '600'
        }}>
          SELECT NEW DATES · LIVE AVAILABILITY
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button
            style={{
              fontSize: '8px',
              padding: '1px 4px',
              background: '#f5f5f7',
              border: '1px solid #e0e0e0',
              borderRadius: '2px',
              cursor: 'pointer',
              color: '#1d1d1f',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f7'}
          >
            ‹
          </button>
          <div style={{ fontSize: '6px', color: '#6e6e73', fontWeight: '600' }}>
            MAR - JUN 2025
          </div>
          <button
            style={{
              fontSize: '8px',
              padding: '1px 4px',
              background: '#f5f5f7',
              border: '1px solid #e0e0e0',
              borderRadius: '2px',
              cursor: 'pointer',
              color: '#1d1d1f',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f7'}
          >
            ›
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {months.map((month, monthIdx) => (
          <div key={month.name} style={{ flex: 1 }}>
            <div style={{ 
              fontSize: '6px', 
              fontWeight: '700', 
              color: '#1d1d1f',
              marginBottom: '2px',
              textAlign: 'center'
            }}>
              {month.name}
            </div>
            
            {/* Day headers */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '1px',
              marginBottom: '2px'
            }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <div key={d} style={{ 
                  fontSize: '5px', 
                  color: '#86868b', 
                  textAlign: 'center',
                  fontWeight: '600',
                  padding: '1px 0'
                }}>{d}</div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '1px'
            }}>
              {/* Empty cells for alignment */}
              {[...Array(month.emptyStart)].map((_, i) => <div key={`empty-${i}`} />)}
              
              {month.days.map(day => {
                const bgColor = day.avail === 'sold' ? '#f5f5f7' : 
                               day.avail === 'low' ? '#fff3cd' : 
                               day.avail === 'medium' ? '#ffe5cc' :
                               day.avail === 'current' ? '#667eea' :
                               '#d4f5dd';
                const textColor = day.current ? '#ffffff' : 
                                 day.avail === 'sold' ? '#d1d1d6' : '#1d1d1f';
                const cursor = day.avail === 'sold' ? 'not-allowed' : 'pointer';
                
                return (
                  <div
                    key={`${month.name}-${day.date}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (day.avail !== 'sold' && onDateClick) {
                        onDateClick(day.date, month.name);
                      }
                    }}
                    style={{
                      background: bgColor,
                      border: day.current ? '1.5px solid #667eea' : '0.5px solid #e0e0e0',
                      borderRadius: '2px',
                      padding: '1px 0px',
                      textAlign: 'center',
                      cursor: cursor,
                      position: 'relative',
                      transition: 'all 0.15s',
                      opacity: day.avail === 'sold' ? 0.5 : 1,
                      minHeight: '18px',
                      fontSize: '7px'
                    }}
                    onMouseOver={(e) => {
                      if (day.avail !== 'sold') {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ 
                      fontSize: '7px', 
                      fontWeight: day.current ? '700' : '600', 
                      color: textColor,
                      lineHeight: '1'
                    }}>
                      {day.date}
                    </div>
                    {!day.current && day.avail !== 'sold' && (
                      <div style={{ 
                        fontSize: '4px', 
                        color: textColor === '#ffffff' ? textColor : '#6e6e73',
                        marginTop: '1px',
                        lineHeight: '1'
                      }}>
                        ${day.price}
                      </div>
                    )}
                    {day.avail === 'sold' && (
                      <div style={{ 
                        fontSize: '4px', 
                        color: '#86868b',
                        marginTop: '1px',
                        fontWeight: '600',
                        lineHeight: '1'
                      }}>
                        FULL
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div style={{
        marginTop: '4px',
        display: 'flex',
        gap: '4px',
        fontSize: '6px',
        color: '#6e6e73'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '6px', height: '6px', background: '#667eea', borderRadius: '1px' }} />
          <span>Current</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '6px', height: '6px', background: '#d4f5dd', borderRadius: '1px' }} />
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '6px', height: '6px', background: '#ffe5cc', borderRadius: '1px' }} />
          <span>Limited</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '6px', height: '6px', background: '#f5f5f7', borderRadius: '1px' }} />
          <span>Sold Out</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;

